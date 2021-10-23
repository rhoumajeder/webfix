from django.db import models
from records.models import Record
from users.models import CustomUser
from django.utils import timezone

# Create your models here.


class ChatRoom(models.Model):
    record = models.ForeignKey(
        Record, related_name="chat_rooms", on_delete=models.CASCADE, blank=True, null=True)
    owner = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='owned_rooms', blank=True, null=True)
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='connected_rooms', blank=True, null=True)

    def __str__(self):
        return f'Owner: {self.owner}. Connected to: {self.user}'


class Message(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="room_messages", blank=True, null=True)
    room = models.ForeignKey(
        ChatRoom, on_delete=models.CASCADE, related_name="messages", blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField(blank=False)

    def __str__(self):
        return self.content
