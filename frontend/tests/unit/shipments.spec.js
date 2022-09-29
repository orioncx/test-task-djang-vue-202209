import {createLocalVue, shallowMount} from '@vue/test-utils'
import ShipmentCard from '@/components/shipments/ShipmentCard'
import Vuetify from "vuetify";
import Vue from "vue";
import VueRouter from "vue-router";
// import ShipmentsListView from "@/views/ShipmentsListView";
import axios from "axios";

jest.mock('axios');
// jest.mock('axios', () => ({get: () => Promise.resolve({})}))

describe('Shipments components', () => {
    // let vuetify
    const localVue = createLocalVue();
    Vue.use(Vuetify);
    Vue.use(VueRouter);

    beforeEach(() => {

    })
    it('renders ShipmentCard.vue', () => {
        const wrapper = shallowMount(ShipmentCard, {
            localVue,
            propsData: {
                shipment: {
                    id: 5,
                    goods_name: 'HIMARS',
                    receiver_address: 'Kiev, Ukraine',
                    state: 'CREATED',
                    total_value: 1000000,
                }
            }
        })
        expect(wrapper.text()).toMatch('created')
        expect(wrapper.text()).toMatch('HIMARS')
        expect(wrapper.text()).toMatch('1000000$')
    })
    it('loads shipments and renders them on ShipmentDetailView.vue', async () => {
        const resp = {
            data: {
                'results': [{
                    id: 5,
                    goods_name: 'HIMARS',
                    receiver_address: 'Kiev, Ukraine',
                    state: 'CREATED',
                    total_value: 1000000,
                }, {
                    id: 7,
                    goods_name: 'Bayraktar',
                    receiver_address: 'Kiev, Ukraine',
                    state: 'CREATED',
                    total_value: 50000,
                }], 'count': 2
            }
        };

        const ShipmentsListView = require("@/views/ShipmentsListView.vue").default;

        axios.get.mockResolvedValueOnce(resp);
        const wrapper = shallowMount(ShipmentsListView, {})
        expect(axios.get).toHaveBeenCalled();
        await new Promise((r) => setTimeout(r, 0));
        expect(wrapper.findAll('shipment-card-stub').length).toBe(2);

    })
})
