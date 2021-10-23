from django.db import models

from users.models import CustomUser
from records.models import Proposition
from chat.models import ChatRoom

# Create your models here.


class Notification(models.Model):
    TYPE = [
        ("Proposition", "Proposition"),
        ("Message", "Message")
    ]

    to_user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="notifications")
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        CustomUser, related_name="created_notifications", on_delete=models.CASCADE)
    message = models.CharField(max_length=255)
    type = models.CharField(max_length=255, null=True, choices=TYPE)

    def __str__(self):
        return f"{self.message}: {self.to_user}"

    class Meta:
        ordering = ['-created_at']


class PropositionNotification(models.Model):
    proposition = models.ForeignKey(
        Proposition, related_name="proposition_notifications", on_delete=models.CASCADE)
    notification = models.OneToOneField(
        Notification, related_name="proposition_notification", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.notification.message}: {self.notification.to_user}"


class RoomNotification(models.Model):
    room = models.ForeignKey(
        ChatRoom, related_name="room_notifications", on_delete=models.CASCADE)
    notification = models.OneToOneField(
        Notification, related_name="room_notification", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.notification.message}: {self.notification.to_user}"
