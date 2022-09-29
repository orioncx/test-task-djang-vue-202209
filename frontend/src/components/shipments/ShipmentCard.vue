<template>
  <div>
    <v-card
        :elevation="3"
        :max-width="1000"
        class="mx-auto mb-6 card__main"
        :disabled="updatingData"
        :color="cardColor"
        v-bind="$attrs"
      >
      <v-card-actions>
        <v-btn
            depressed
            fab
            x-small
            @click="editShipment(shipment)"
        >
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-card-text class="text-overline pb-0 text-right text-uppercase">
          {{ SHIPMENT_STATES[shipment.state].name }}
        </v-card-text>
      </v-card-actions>

      <v-card-title class="pt-0">
        <router-link
            :to="{name:'shipment-detail', params:{id:shipment.id}}"
        >{{ shipment.goods_name }}</router-link>
      </v-card-title>
      <v-card-subtitle>{{ shipment.total_value }}$</v-card-subtitle>
      <v-card-text class="" style="white-space: pre-line;">{{ shipment.receiver_address }}</v-card-text>
      <v-card-actions class="align-content-end">
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                depressed
                v-bind="attrs"
                v-on="on"
                :loading="updatingState"
            >
              Change State
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                v-for="(state, index) in Object.keys(SHIPMENT_STATES)"
                :key="index"
                link
                @click="updateState(shipment, state)"
            >
              <v-list-item-title class="text-capitalize">{{ SHIPMENT_STATES[state].name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
            depressed
            color="error"
            @click="remove(shipment)"
            :loading="removing"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
    <shipment-edit-create-popup
        ref="createEditDialog"
    ></shipment-edit-create-popup>

  </div>
</template>

<script>
import shipmentsMainResource from "@/resources/shipments/shipmentsMain";
import ShipmentEditCreatePopup from "@/components/shipments/ShipmentEditCreatePopup";

const SHIPMENT_STATES = {
  CREATED: {
    name: 'created',
  },
  READY: {
    name: 'ready',
  },
  SHIPPED: {
    name: 'shipped',
  },
  RECEIVED: {
    name: 'received',
    color: 'rgba(137,196,126,0.15)'
  },
  UNSUCCESSFUL: {
    name: 'unsuccessful',
    color: 'rgba(196,126,139,0.15)'
  },
}

export default {
  name: "ShipmentCard",
  components: {ShipmentEditCreatePopup},
  props: {
    shipment: Object
  },
  data() {
    return {
      SHIPMENT_STATES,

      removing: false,
      updatingState: false,
      updatingData: false,
    }
  },
  computed: {
    cardColor() {
      return SHIPMENT_STATES[this.shipment.state].color || '#fff';
    }
  },
  methods: {
    async remove(shipment) {
      await shipmentsMainResource.delete(shipment.id);
      this.$emit('removed', shipment)
    },
    async editShipment(shipment) {
      const updatedData = await this.$refs.createEditDialog.edit(shipment).catch(() => {
      });
      if (!updatedData) {
        return;
      }
      this.updatingData = true;
      await shipmentsMainResource.update(shipment.id, updatedData).catch(() => {
      });
      this.$emit('updated', this.shipment, updatedData)
      this.updatingData = false;
    },

    async updateState(shipment, state) {
      this.updatingState = true;
      await shipmentsMainResource.update(shipment.id, {state}).catch(() => {
      });
      this.$emit('updated', this.shipment, {state})
      this.updatingState = false;
    },
  }

}
</script>

<style scoped lang="scss">
.card{
  &__main{
    transition: background-color ease 0.2s;
  }
}
</style>