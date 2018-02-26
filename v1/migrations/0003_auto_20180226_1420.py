# Generated by Django 2.0.2 on 2018-02-26 14:20

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0002_auto_20180226_1419'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='mobile',
            field=models.CharField(default=datetime.datetime(2018, 2, 26, 14, 20, 24, 688747, tzinfo=utc), max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='product_id',
            field=models.CharField(default=datetime.datetime(2018, 2, 26, 14, 20, 24, 691459, tzinfo=utc), max_length=255, unique=True),
        ),
    ]
