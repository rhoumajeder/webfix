# Generated by Django 3.2.5 on 2022-01-20 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0045_alter_proposition_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='rje_image_ask',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
        migrations.AddField(
            model_name='record',
            name='rje_image_propose',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
