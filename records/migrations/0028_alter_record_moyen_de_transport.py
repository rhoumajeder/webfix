# Generated by Django 3.2.5 on 2021-10-23 23:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0027_auto_20211019_1829'),
    ]

    operations = [
        migrations.AlterField(
            model_name='record',
            name='moyen_de_transport',
            field=models.CharField(blank=True, choices=[('Car', 'Car'), ('Avion', 'Avion')], max_length=50, null=True),
        ),
    ]
