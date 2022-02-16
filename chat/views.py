from django.shortcuts import render, get_object_or_404
from django.http import (
    Http404
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework import status

from .models import ChatRoom, Message
from .serializers import ChatRoomSerializer, MessageSerializer
from users.models import CustomUser
from records.models import Record
from notifications.utils import create_notification

from django.views.decorators.vary import vary_on_cookie
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination


from django.core.cache import cache


# Create your views here.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def chat_room(request, owner_id, user_id, record_id): #owner_email 
    owner = get_object_or_404(CustomUser, id=owner_id)
    user = get_object_or_404(CustomUser, id=user_id)
    record = get_object_or_404(Record, id=record_id)

    new_room, created = ChatRoom.objects.get_or_create(owner=owner, user=user, record=record)

    room_serializer = ChatRoomSerializer(new_room)

    # cache_chat_room_key_owner = str("chat_room") + str(owner_id)
    # cache_chat_room_key_user = str("chat_room") + str(user_id)

    # cache.delete(cache_chat_room_key_owner)
    # cache.delete(cache_chat_room_key_user)
   

    return Response(room_serializer.data, status=status.HTTP_200_OK)


# @cache_page(60 * 15)
# @vary_on_headers('Authorization')
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_rooms(request):
    # owner_rooms = ChatRoom.objects.filter(
    #     owner=request.user).order_by('-last_updated_room_at')
    # user_rooms = ChatRoom.objects.filter(
    #     user=request.user).order_by('-last_updated_room_at') # Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6)

    user_rooms = ChatRoom.objects.filter(Q(user=request.user) | Q(owner=request.user)).order_by('-last_updated_room_at')

    #owner_room_serializer = ChatRoomSerializer(owner_rooms, many=True)

    paginator = PageNumberPagination()
    paginator.page_size = 5
    result_page = paginator.paginate_queryset(user_rooms, request)
    user_room_serializer = ChatRoomSerializer(result_page, many=True)
    responded_data = {"owner_rooms": [], "user_rooms": user_room_serializer.data}
    return paginator.get_paginated_response(responded_data)

    # cache_key_get_rooms = str("chat_room") + str(request.user.id)

    # if cache.get(cache_key_get_rooms) != None : 
    #     return  Response(cache.get(cache_key_get_rooms), status=status.HTTP_200_OK)
    
    #responded_data = {"owner_rooms": owner_room_serializer.data, "user_rooms": user_room_serializer.data}
    # responded_data = {"owner_rooms": [], "user_rooms": user_room_serializer.data}
    # cache.get_or_set(cache_key_get_rooms, responded_data, 60 *15 )

    # return Response(responded_data, status=status.HTTP_200_OK) 


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_message(request, room_id):

    room = get_object_or_404(ChatRoom, id=room_id)
    serializer = MessageSerializer(data=request.data)

    if serializer.is_valid():
        message = serializer.save(room=room, user=request.user)

        to_user = ""
        # if room.owner.username == request.user.username:
        if room.owner.id == request.user.id:
            to_user = room.user
        else:
            to_user = room.owner

        create_notification(
            to_user=to_user, created_by=request.user, type="Message", reference=room, message=f"{request.user.username} vous a envoyé un message",)

        # cache_create_message_key_owner = str("create_message") + str(room.owner.id) + str(room_id)
        # cache_create_message_key_user = str("create_message") + str(room.user.id) + str(room_id)
        # cache.delete(cache_create_message_key_owner)
        # cache.delete(cache_create_message_key_user)

        # cache_key_get_rooms_owner = str("chat_room") + str(room.owner.id)
        # cache_key_get_rooms_user = str("chat_room") + str(room.user.id)

        # cache.delete(cache_key_get_rooms_owner)
        # cache.delete(cache_key_get_rooms_user)

        
        room.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @cache_page(60 * 15)
# @vary_on_headers('Authorization')
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_messages(request, room_id):
    print(room_id)
    #room = get_object_or_404(ChatRoom, id=room_id)  #Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6)

    # cache_create_message_key = str("create_message") + str(request.user.id) + str(room_id)

    # if cache.get(cache_create_message_key ) != None : 
    #     return  Response(cache.get(cache_create_message_key), status=status.HTTP_200_OK)

    try :
        room = ChatRoom.objects.get(Q(id=room_id), Q(owner=request.user) | Q(user=request.user ) )
    except :
        raise Http404("not found")
    serializer = MessageSerializer(room.messages.all(), many=True)

    responded_data = serializer.data
    # cache.get_or_set(cache_create_message_key, responded_data, 60 *15 )


    return Response(responded_data, status=status.HTTP_200_OK)
