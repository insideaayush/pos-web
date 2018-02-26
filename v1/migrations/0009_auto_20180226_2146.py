# Generated by Django 2.0.2 on 2018-02-26 21:46

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0008_auto_20180226_1618'),
    ]

    operations = [
        migrations.AddField(
            model_name='sale',
            name='invoice_id',
            field=models.CharField(default=datetime.datetime(2018, 2, 26, 21, 46, 52, 88916, tzinfo=utc), max_length=200, unique=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='product_id',
            field=models.CharField(default=datetime.datetime(2018, 2, 26, 21, 46, 52, 88220, tzinfo=utc), max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='productinsale',
            name='sale',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products_in_sale', to='v1.Sale'),
        ),
    ]
