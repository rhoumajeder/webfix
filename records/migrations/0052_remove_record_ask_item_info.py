# Generated by Django 3.2.5 on 2022-01-22 23:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0051_auto_20220123_0005'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='record',
            name='ask_item_info',
        ),
    ]