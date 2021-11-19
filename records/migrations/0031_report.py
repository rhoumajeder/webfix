# Generated by Django 3.2.5 on 2021-11-06 12:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('records', '0030_alter_record_phone_number'),
    ]

    operations = [
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(max_length=400)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('validated', models.BooleanField(default=True)),
                ('receiver', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='received_report', to=settings.AUTH_USER_MODEL)),
                ('writer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='written_report', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
