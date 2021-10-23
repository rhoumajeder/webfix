# Generated by Django 3.2.5 on 2021-08-29 17:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0002_alter_record_created_by'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propositionitemimage',
            name='item',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='item_images', to='records.propositionitem'),
        ),
    ]
