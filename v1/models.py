from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

PERMISSIONS = [
        ('AD', 'Admin'),
        ('SL', 'Sales'),
        ('PU', 'Purchase'),
        ('AC', 'Accounts'),
    ]

PAYMENT_METHODS = [
    ('CSH', 'Cash'),
    ('CRD', 'Credit/Debit Card'),
    ('WAL', 'Wallet'),
    ('UPI', 'BHIM UPI'),
]

CHANNELS = [
    ('IN', 'In-Store'),
    ('ON', 'Online')
]

GENDERS = [
    ('M', 'Male'),
    ('F', 'Female'),
    ('O', 'Other'),
]

"""
Users and Permissions
"""
class AccessPermission(models.Model):
    kind = models.CharField(choices=PERMISSIONS, default='Sales', max_length=100)
    
    def __str__(self):
        return self.kind

class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    reports_to = models.ForeignKey('self', null=True, blank=True, related_name="employees", on_delete=models.CASCADE)
    permissions = models.ManyToManyField(AccessPermission)
    
    def __str__(self):
        return self.user.username
    
class Customer(models.Model):
    # remember to remove default
    name = models.CharField(max_length=200, null=True, blank=True)
    gender = models.CharField(max_length=100, choices=GENDERS, default="Male")
    mobile = models.CharField(max_length=100, unique=True, null=True, blank=True)
    
    def __str__(self):
        return "%s" % (self.name)

class Vendor(models.Model):
    # remember to remove default
    name = models.CharField(max_length=200, null=True, blank=True)
    mobile = models.CharField(max_length=100, unique=True, null=True, blank=True)
    
    def __str__(self):
        return "%s" % (self.name)



"""
Payments
"""
class Payment(models.Model):
    method = models.CharField(choices=PAYMENT_METHODS, default='Cash', max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=3, default=0)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s: %d" % (self.method, self.amount)

class Transaction(models.Model):
    all_payments = models.ManyToManyField(Payment)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%d" % self.id

"""
Inventory Management
"""
class Store(models.Model):
    name = models.CharField(max_length=200, unique=True)
    location = models.CharField(null=True, blank=True, max_length=200)

    def __str__(self):
        return self.name

class Warehouse(models.Model):
    name = models.CharField(max_length=200, unique=True)
    location = models.CharField(null=True, blank=True, max_length = 200)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    product_id = models.CharField(default=timezone.now(), max_length=255, unique=True)
    description = models.TextField(null=True, blank=True)
    cost_price = models.DecimalField(null=True, default=None, max_digits=10,decimal_places=3)
    max_retail_price = models.DecimalField(null=True, default=None, max_digits=10,decimal_places=3)
    selling_price = models.DecimalField(null=True, default=None, max_digits=10,decimal_places=3)
    category = models.CharField(max_length=200)
    brand = models.CharField(null=True, max_length=200)
    size = models.CharField(null=True, max_length=200)
    color = models.CharField(null=True, max_length=200)
    design = models.CharField(null=True, max_length=200)
    quality = models.CharField(null=True, max_length=200)
    
    class Meta:
        ordering = ['name']

    def __str__(self):
        return '%s: %s' % (self.product_id, self.name)
    
    def __unicode__(self):
        return '%s: %s' % (self.product_id, self.name)

"""
Models to register Sale, Products in Sale and invoices
"""

class Sale(models.Model):
    invoice_id = models.CharField(default=timezone.now(), max_length=200, unique=True)
    channel = models.CharField(choices=CHANNELS, default='In-Store', max_length=100)
    customer = models.ForeignKey(Customer, null=True, on_delete=models.CASCADE)
    transaction = models.ForeignKey(Transaction, null=True, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, null=True, on_delete=models.CASCADE)
    store = models.ForeignKey(Store, null=True, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    total_tax = models.DecimalField(default=0, max_digits=10,decimal_places=3)
    total_amount = models.DecimalField(default=0, max_digits=10,decimal_places=3)

class ProductInSale(models.Model):
    sale = models.ForeignKey(Sale, null=True, related_name="products_in_sale", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    total_qty = models.IntegerField(default=0)


"""
Models to register Purchase, Products in Purchase and invoices
"""

class Purchase(models.Model):
    purchase_id = models.CharField(default=timezone.now(), max_length=200, unique=True)
    vendor = models.ForeignKey(Vendor, null=True, on_delete=models.CASCADE)
    transaction = models.ForeignKey(Transaction, null=True, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, null=True, on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse, null=True, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    total_tax = models.DecimalField(default=0, max_digits=10,decimal_places=3)
    total_amount = models.DecimalField(default=0, max_digits=10,decimal_places=3)

class ProductInPurchase(models.Model):
    purchase = models.ForeignKey(Purchase, null=True, related_name="products_in_purchase", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    total_qty = models.IntegerField(default=0)