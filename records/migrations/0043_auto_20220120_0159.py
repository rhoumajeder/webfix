# Generated by Django 3.2.5 on 2022-01-20 00:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0042_auto_20220120_0159'),
    ]

    operations = [
        migrations.RenameField(
            model_name='record',
            old_name='image_ask',
            new_name='gimage_ask',
        ),
        migrations.RenameField(
            model_name='record',
            old_name='image_propose',
            new_name='gimage_propose',
        ),
    ]
