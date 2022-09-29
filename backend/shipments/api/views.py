from rest_framework import viewsets

from shipments.api.serializers import ShipmentSerializer
from shipments.models import Shipment


class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
