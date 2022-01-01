from rest_framework import serializers

from .models import ChatRoom, Message
from users.serializers import UserSerializer,UserSerializer_for_message
from records.serializers import RecordDetailSerializer,RecordDetailSerializer_lighter, RecordDetailSerializer_for_get_rooms


class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer_for_message(read_only=True)
    #user = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = "__all__"


class ChatRoomSerializer(serializers.ModelSerializer):
    owner = UserSerializer_for_message(read_only=True)
    user = UserSerializer_for_message(read_only=True)
    record = RecordDetailSerializer_for_get_rooms(read_only=True)  
    #record = RecordDetailSerializer_lighter(read_only=True)  
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatRoom
        fields = "__all__"

class ChatRoomSerializer_for_notifications(serializers.ModelSerializer):
    owner = UserSerializer_for_message(read_only=True)
    user = UserSerializer_for_message(read_only=True)
    #record = RecordDetailSerializer_lighter(read_only=True)
    #messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatRoom
        fields = "__all__"

#backup
# class ChatRoomSerializer(serializers.ModelSerializer):
#     owner = UserSerializer(read_only=True)
#     user = UserSerializer(read_only=True)
#     record = RecordDetailSerializer(read_only=True)
#     messages = MessageSerializer(many=True, read_only=True)

#     class Meta:
#         model = ChatRoom
#         fields = "__all__"
