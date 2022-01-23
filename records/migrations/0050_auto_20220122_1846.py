# Generated by Django 3.2.5 on 2022-01-22 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0049_alter_record_min_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='ask_item_info',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='record',
            name='ask_total_price',
            field=models.PositiveIntegerField(default=0, null=True),
        ),
        migrations.AddField(
            model_name='record',
            name='ask_total_weight',
            field=models.PositiveIntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='record',
            name='min_price',
            field=models.PositiveIntegerField(default=0, null=True),
        ),
    ]
