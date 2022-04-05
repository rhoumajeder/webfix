# Generated by Django 3.2.5 on 2022-04-05 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0066_alter_record_max_weight'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='cost_by_kg',
            field=models.DecimalField(blank=True, decimal_places=1, default=1, max_digits=5, null=True),
        ),
    ]
