# Generated by Django 3.2.5 on 2021-10-19 23:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0025_feedback'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='proposition',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='feedback', to='records.proposition'),
        ),
        migrations.AddField(
            model_name='proposition',
            name='feedback_left',
            field=models.BooleanField(default=False),
        ),
    ]
