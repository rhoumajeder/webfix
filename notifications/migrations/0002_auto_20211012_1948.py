# Generated by Django 3.2.5 on 2021-10-13 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='link',
        ),
        migrations.AddField(
            model_name='notification',
            name='type',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
