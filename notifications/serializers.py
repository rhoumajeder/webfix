from rest_framework import serializers

from .models import Notification, PropositionNotification, RoomNotification
from users.serializers import UserSerializer
from records.serializers import PropositionSerializer
from chat.serializers import ChatRoomSerializer


class ChatNotificationSerializer(serializers.ModelSerializer):
    room = ChatRoomSerializer(read_only=True)

    class Meta:
        model = RoomNotification
        fields = "__all__"


class PropositionNotificationSerializer(serializers.ModelSerializer):
    proposition = PropositionSerializer(read_only=True)

    class Meta:
        model = PropositionNotification
        fields = "__all__"


class NotificationSerializer(serializers.ModelSerializer):
    to_user = UserSerializer(read_only=True)
    created_by = UserSerializer(read_only=True)
    proposition_notification = PropositionNotificationSerializer(
        read_only=True)
    room_notification = ChatNotificationSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = "__all__"
