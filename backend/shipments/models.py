from django.db import models


# Create your models here.
class Shipment(models.Model):
    class State(models.TextChoices):
        CREATED = 'CREATED', 'Created'
        READY = 'READY', 'Ready'
        SHIPPED = 'SHIPPED', 'Shipped'
        RECEIVED = 'RECEIVED', 'Received'
        UNSUCCESSFUL = 'UNSUCCESSFUL', 'Unsuccessful'

    created_at = models.DateTimeField(auto_now_add=True)
    goods_name = models.CharField(max_length=127)
    receiver_address = models.TextField(max_length=1023)
    total_value = models.FloatField()
    state = models.CharField(
        max_length=15,
        choices=State.choices,
        default=State.CREATED
    )

    class Meta:
        ordering = ('-created_at',)
