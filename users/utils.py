from django.conf import settings
from django.core.mail import send_mail


def send_reset_email(email, token):
    message = f"""Click on the link below to reset your password. 
{settings.FRONT_END_APP}/reset-password?token={token}"""

    send_mail("Reset Password for Skillit Challenges", message, settings.EMAIL_HOST_USER, [email], fail_silently=False)
