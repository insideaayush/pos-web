# Generated by Django 2.0.2 on 2018-03-21 19:22

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0014_auto_20180320_0000'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductStockLevel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=0)),
            ],
        ),
        migrations.AlterField(
            model_name='product',
            name='product_id',
            field=models.CharField(default=datetime.datetime(2018, 3, 21, 19, 22, 27, 390035, tzinfo=utc), max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='purchase',
            name='purchase_id',
            field=models.CharField(default=datetime.datetime(2018, 3, 21, 19, 22, 27, 392047, tzinfo=utc), max_length=200, unique=True),
        ),
        migrations.AlterField(
            model_name='sale',
            name='invoice_id',
            field=models.CharField(default=datetime.datetime(2018, 3, 21, 19, 22, 27, 390718, tzinfo=utc), max_length=200, unique=True),
        ),
        migrations.AddField(
            model_name='productstocklevel',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='v1.Product'),
        ),
        migrations.AddField(
            model_name='productstocklevel',
            name='store',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='v1.Store'),
        ),
        migrations.AddField(
            model_name='productstocklevel',
            name='warehouse',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='v1.Warehouse'),
        ),
    ]