from django.shortcuts import render, get_object_or_404

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework import status

from .models import ChatRoom, Message
from .serializers import ChatRoomSerializer, MessageSerializer
from users.models import CustomUser
from records.models import Record
from notifications.utils import create_notification


# Create your views here.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def chat_room(request, owner_email, user_email, record_id):
    owner = get_object_or_404(CustomUser, email=owner_email)
    user = get_object_or_404(CustomUser, email=user_email)
    record = get_object_or_404(Record, id=record_id)

    new_room = ChatRoom.objects.get_or_create(
        owner=owner, user=user, record=record)

    room_serializer = ChatRoomSerializer(new_room)

    return Response(room_serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_rooms(request):
    owner_rooms = ChatRoom.objects.filter(
        owner=request.user)
    user_rooms = ChatRoom.objects.filter(
        user=request.user)

    owner_room_serializer = ChatRoomSerializer(owner_rooms, many=True)
    user_room_serializer = ChatRoomSerializer(user_rooms, many=True)

    return Response({"owner_rooms": owner_room_serializer.data, "user_rooms": user_room_serializer.data}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_message(request, room_id):

    room = get_object_or_404(ChatRoom, id=room_id)
    serializer = MessageSerializer(data=request.data)

    if serializer.is_valid():
        message = serializer.save(room=room, user=request.user)

        to_user = ""

        if room.owner.username == request.user.username:
            to_user = room.user
        else:
            to_user = room.owner

        create_notification(
            to_user=to_user, created_by=request.user, type="Message", reference=room, message=f"{request.user.username} has sent you a message",)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_messages(request, room_id):
    print(room_id)
    room = get_object_or_404(ChatRoom, id=room_id)
    serializer = MessageSerializer(room.messages.all(), many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
