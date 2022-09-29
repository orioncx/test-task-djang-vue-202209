<template>
  <div>
    <div v-if="shipments.length&&(shipmentsTotal!==undefined)">
      <shipment-card
          v-for="shipment in shipments"
          :key="shipment.id"
          :shipment="shipment"
          @removed="shipmentRemoved"
          @updated="shipmentUpdated"
      ></shipment-card>
      <v-card v-intersect="loadMore"></v-card>
    </div>
    <div v-else-if="shipmentsTotal===undefined">
      loading...
    </div>
    <div v-else>
      <v-alert
          dense
          type="info"
          max-width="1000"
          class="mx-auto"
      >
        No shipments yet. Create a first one using the button in the bottom right corner
      </v-alert>
    </div>
    <v-btn
        color="green"
        dark
        fixed
        bottom
        right
        fab
        :loading="creatingShipment"
        @click="createShipment"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <shipment-edit-create-popup
        ref="createEditDialog"
    ></shipment-edit-create-popup>
  </div>
</template>

<script>

import ShipmentEditCreatePopup from "@/components/shipments/ShipmentEditCreatePopup";
import shipmentsMainResource from "@/resources/shipments/shipmentsMain";
import ShipmentCard from "@/components/shipments/ShipmentCard";


export default {
  name: 'ShipmentsListView',
  components: {ShipmentCard, ShipmentEditCreatePopup},
  data() {
    return {
      shipments: [],
      shipmentsTotal: undefined,

      creatingShipment: false,
    }
  },
  computed: {},
  methods: {
    async loadShipments() {
      try {
        const {data} = await shipmentsMainResource.list({offset: this.shipments.length});
        this.shipments = this.shipments.concat(data.results);
        this.shipmentsTotal = data.count;
      } catch (e) {
        console.error(e);
      }
    },
    async createShipment() {
      const shipmentData = await this.$refs.createEditDialog.create().catch(() => {
      });
      if (!shipmentData) {
        return;
      }
      this.creatingShipment = true;
      try {
        const {data: shipment} = await shipmentsMainResource.create(shipmentData);
        this.shipments.unshift(shipment);
        this.shipmentsTotal += 1;
      } catch (e) {
        console.error(e);
      }
      this.creatingShipment = false;
    },
    async loadMore() {
      if (this.shipmentsTotal === this.shipments.length) {
        return;
      }
      await this.loadShipments();
    },
    shipmentRemoved(shipment) {
      this.shipments.splice(this.shipments.indexOf(shipment), 1);
      this.shipmentsTotal -= 1;
    },
    shipmentUpdated(shipment, updatedData) {
      Object.assign(shipment, updatedData);
    },
  },
  mounted() {
    this.loadShipments();
  }
}
</script>
