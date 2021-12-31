from rest_framework import serializers

from .models import Notification, PropositionNotification, RoomNotification
from users.serializers import UserSerializer,UserSerializer_for_message
from records.serializers import PropositionSerializer,PropositionSerializer_for_notifications
from chat.serializers import ChatRoomSerializer,ChatRoomSerializer_for_notifications


class ChatNotificationSerializer(serializers.ModelSerializer):
    room = ChatRoomSerializer_for_notifications(read_only=True)

    class Meta:
        model = RoomNotification
        fields = "__all__"


class PropositionNotificationSerializer(serializers.ModelSerializer):
    #proposition = PropositionSerializer(read_only=True)
    proposition = PropositionSerializer_for_notifications(read_only=True)

    class Meta:
        model = PropositionNotification
        fields = "__all__"


class NotificationSerializer(serializers.ModelSerializer):
    # to_user = UserSerializer(read_only=True)
    # created_by = UserSerializer(read_only=True) UserSerializer_for_message
    to_user = UserSerializer_for_message(read_only=True)
    created_by = UserSerializer_for_message(read_only=True) 
    
    proposition_notification = PropositionNotificationSerializer(
        read_only=True)
    room_notification = ChatNotificationSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = "__all__"
