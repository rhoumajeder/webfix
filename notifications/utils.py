from .models import Notification, PropositionNotification, RoomNotification


def create_notification(to_user, created_by, message, type, reference):
    notification = Notification.objects.create(
        to_user=to_user, created_by=created_by, message=message, type=type)

    if type == "Proposition":
        PropositionNotification.objects.create(
            notification=notification, proposition=reference)
    elif type == "Message":
        RoomNotification.objects.create(
            notification=notification, room=reference
        )
