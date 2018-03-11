# Generated by Django 2.0.2 on 2018-02-26 13:11

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AccessPermission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kind', models.CharField(choices=[('AD', 'Admin'), ('SL', 'Sales'), ('PU', 'Purchase'), ('AC', 'Accounts')], default='Sales', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('method', models.CharField(choices=[('CA', 'Cash'), ('CC', 'Credit Card'), ('DC', 'Debit Card'), ('WA', 'Wallet'), ('UPI', 'BHIM UPI')], default='Cash', max_length=100)),
                ('amount', models.DecimalField(decimal_places=3, default=0, max_digits=10)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('product_id', models.CharField(default=datetime.datetime(2018, 2, 26, 13, 11, 17, 243745, tzinfo=utc), max_length=255, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('cost_price', models.DecimalField(decimal_places=3, default=None, max_digits=10, null=True)),
                ('max_retail_price', models.DecimalField(decimal_places=3, default=None, max_digits=10, null=True)),
                ('selling_price', models.DecimalField(decimal_places=3, default=None, max_digits=10, null=True)),
                ('category', models.CharField(max_length=200, unique=True)),
                ('brand', models.CharField(max_length=200, null=True)),
                ('size', models.CharField(max_length=200, null=True)),
                ('color', models.CharField(max_length=200, null=True)),
                ('design', models.CharField(max_length=200, null=True)),
                ('quality', models.CharField(max_length=200, null=True)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='ProductInSale',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_qty', models.IntegerField(default=0)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='v1.Product')),
            ],
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('channel', models.CharField(choices=[('IN', 'In-Store'), ('ON', 'Online')], default='In-Store', max_length=100)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('total_amount', models.DecimalField(decimal_places=3, default=0, max_digits=10)),
                ('customer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='v1.Customer')),
            ],
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('permissions', models.ManyToManyField(to='v1.AccessPermission')),
                ('reports_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='employees', to='v1.Staff')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Store',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('location', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('all_payments', models.ManyToManyField(to='v1.Payment')),
            ],
        ),
        migrations.CreateModel(
            name='Warehouse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('location', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='sale',
            name='staff',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='v1.Staff'),
        ),
        migrations.AddField(
            model_name='sale',
            name='store',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='v1.Store'),
        ),
        migrations.AddField(
            model_name='sale',
            name='transaction',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='v1.Transaction'),
        ),
        migrations.AddField(
            model_name='productinsale',
            name='sale',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='v1.Sale'),
        ),
    ]