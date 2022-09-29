from rest_framework import routers
from shipments.api.views import ShipmentViewSet

shipments_router = routers.DefaultRouter()
shipments_router.register(r'shipments', ShipmentViewSet, basename='shipments')
