# Generated by Django 3.2.5 on 2021-09-04 04:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0007_proposition_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='propositionitem',
            name='quantity',
            field=models.PositiveBigIntegerField(null=True),
        ),
    ]
