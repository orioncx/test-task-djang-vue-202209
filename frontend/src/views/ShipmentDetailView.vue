<template>
  <div>
    <shipment-card
        v-if="shipment"
        :shipment="shipment"
        shaped
        @removed="shipmentRemoved"
        @updated="shipmentUpdated"
    ></shipment-card>
    <v-alert
        dense
        type="error"
        max-width="1000"
        class="mx-auto"
        v-if="shipmentNotFoundError"
    >
      Shipment not found
    </v-alert>
    <v-btn
        color="blue"
        class="mt-4"
        dark
        absolute
        top
        right
        fab
        @click="goMain"
        style="z-index: 5"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
  </div>
</template>

<script>
import ShipmentCard from "@/components/shipments/ShipmentCard";
import shipmentsMain from "@/resources/shipments/shipmentsMain";

export default {
  name: "ShipmentDetailView",
  components: {ShipmentCard},
  props: {
    id: [String, Number]
  },
  data() {
    return {
      shipment: undefined,
      shipmentNotFoundError: false,
    }
  },
  methods: {
    async loadShipment() {
      try {
        const {data: shipment} = await shipmentsMain.one(this.id);
        this.shipment = shipment;
      } catch (e) {
        this.shipmentNotFoundError = true;
      }
    },
    goMain() {
      this.$router.push('/');
    },
    shipmentRemoved() {
      this.$router.replace('/');
    },
    shipmentUpdated(shipment, updatedData) {
      Object.assign(shipment, updatedData);
    },
  },
  mounted() {
    this.loadShipment();
  }
}
</script>

<style scoped>

</style>