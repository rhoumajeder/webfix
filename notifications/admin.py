from django.contrib import admin

from .models import Notification, PropositionNotification, RoomNotification

# Register your models here.
admin.site.register(Notification)
admin.site.register(PropositionNotification)
admin.site.register(RoomNotification)
