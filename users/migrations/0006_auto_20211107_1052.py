# Generated by Django 3.2.5 on 2021-11-07 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_customuser_intro'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_pro',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='customuser',
            name='last_name',
            field=models.CharField(blank=True, max_length=150),
        ),
    ]