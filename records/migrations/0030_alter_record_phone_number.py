# Generated by Django 3.2.5 on 2021-10-27 01:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0029_record_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='record',
            name='phone_number',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
