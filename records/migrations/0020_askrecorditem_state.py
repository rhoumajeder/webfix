# Generated by Django 3.2.5 on 2021-09-20 23:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0019_proposition_proposition_state'),
    ]

    operations = [
        migrations.AddField(
            model_name='askrecorditem',
            name='state',
            field=models.CharField(default='Accepted', max_length=255),
        ),
    ]
