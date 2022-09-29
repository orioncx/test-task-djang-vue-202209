<template>
  <v-dialog
      :width="500"
      persistent
      v-model="opened"
  >
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        {{ headerText }}
      </v-card-title>
      <v-card-text>
        <v-form
            v-model="formValid"
            ref="form"
        >
          <v-container>
            <v-row>
              <v-col :cols="12">
                <v-text-field
                    label="Goods name*"
                    required
                    validate-on-blur
                    autofocus
                    v-model="goodsName"
                    :rules="goodsNameRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="12">
                <v-text-field
                    label="Total value (USD)*"
                    required
                    v-model="totalValue"
                    :rules="totalValueRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="12">
                <v-textarea
                    name="input-7-1"
                    label="Receiver Address"
                    v-model="receiverAddress"
                    :rules="receiverAddressRules"
                    required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            depressed
            @click="close"
        >
          Close
        </v-btn>
        <v-btn
            color="primary"
            depressed
            :disabled="!formValid"
            @click="save"
        >
          {{ saveButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const MAX_TOTAL_VALUE = 10000000;
const MAX_NAME_LENGTH = 127;
const MAX_ADDRESS_LENGTH = 1023;

export default {
  name: "ShipmentEditCreatePopup",
  data() {
    return {
      opened: false,

      formValid: false,

      goodsName: '',
      totalValue: '',
      receiverAddress: '',

      saveButtonText: '',
      headerText: '',

      goodsNameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= MAX_NAME_LENGTH) || `Name must be less than ${MAX_NAME_LENGTH} characters`,
      ],
      totalValueRules: [
        v => !!v || 'Value is required',
        v => /^\d+(\.\d+)?$/.test(v) || 'Should be Number',
        v => parseFloat(v) < MAX_TOTAL_VALUE || 'Too expensive, isn\'t it? ;)',
      ],
      receiverAddressRules: [
        v => !!v || 'Address is required',
        v => (v && v.length <= MAX_ADDRESS_LENGTH) || `Address must be less than ${MAX_ADDRESS_LENGTH} characters`,
      ],
    }
  },
  computed: {},
  methods: {
    create() {
      this.saveButtonText = 'Create';
      this.headerText = 'Create shipment';
      this.opened = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      })
    },
    edit(initial = {}) {
      this.saveButtonText = 'Save';
      this.headerText = 'Edit shipment';
      this.opened = true;
      Object.assign(this, {
        goodsName: initial.goods_name,
        totalValue: String(initial.total_value),
        receiverAddress: initial.receiver_address,
      });
      this.$nextTick(() => this.$refs.form.validate());
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      })
    },
    close() {
      this.$refs.form.reset();
      this.$refs.form.reset();
      this.opened = false;
      this.reject();
    },
    save() {
      this.opened = false;
      this.resolve({
        goods_name: this.goodsName,
        total_value: parseFloat(this.totalValue),
        receiver_address: this.receiverAddress,
      });
      this.$refs.form.reset();
    },
  }
}
</script>

<style scoped>

</style>