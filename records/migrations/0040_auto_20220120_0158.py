# Generated by Django 3.2.5 on 2022-01-20 00:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0039_auto_20220120_0156'),
    ]

    operations = [
        migrations.RenameField(
            model_name='record',
            old_name='generated_image_ask',
            new_name='generated_imagefor_ask',
        ),
        migrations.RenameField(
            model_name='record',
            old_name='generated_image_propose',
            new_name='generated_imagefor_propose',
        ),
    ]