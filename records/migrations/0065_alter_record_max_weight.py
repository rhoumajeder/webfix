# Generated by Django 3.2.5 on 2022-04-05 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0064_alter_record_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='record',
            name='max_weight',
            field=models.DecimalField(blank=True, decimal_places=2, default=1, max_digits=5, null=True),
        ),
    ]