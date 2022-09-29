import json
import random
import string

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.reverse import reverse

from shipments.models import Shipment


class ShipmentsViewSetTestCase(TestCase):
    def setUp(self):
        self._get_random_string = lambda: str(''.join(
            random.choice(string.ascii_lowercase + string.digits) for _ in range(7)))
        self.shipment = Shipment.objects.create(
            goods_name=self._get_random_string(),
            receiver_address=self._get_random_string(),
            total_value=100)
        self.drf_client = APIClient()

    def test_list(self):
        endpoint = reverse('shipments-list')
        response = self.drf_client.get(endpoint)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)

    def test_remove(self):
        endpoint = reverse('shipments-detail', args=(self.shipment.id,))
        response = self.drf_client.delete(endpoint)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Shipment.objects.count(), 0)

    def test_update(self):
        endpoint = reverse('shipments-detail', args=(self.shipment.id,))
        new_name = self._get_random_string()
        response = self.drf_client.patch(endpoint, data={'goods_name': new_name})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.shipment.refresh_from_db()
        self.assertEqual(self.shipment.goods_name, new_name)

    def test_create(self):
        endpoint = reverse('shipments-list')
        new_name = self._get_random_string()
        response = self.drf_client.post(endpoint, data={
            'goods_name': new_name,
            'receiver_address': self._get_random_string(),
            'total_value': 5000,
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['goods_name'], new_name)
        self.assertEqual(Shipment.objects.count(), 2)
