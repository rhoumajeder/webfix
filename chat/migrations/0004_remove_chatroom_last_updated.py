# Generated by Django 3.2.5 on 2021-10-23 14:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_chatroom_last_updated'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chatroom',
            name='last_updated',
        ),
    ]
