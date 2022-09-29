import Vue from 'vue'
import VueRouter from 'vue-router'
import ShipmentsListView from '../views/ShipmentsListView.vue'
import ShipmentDetailView from "@/views/ShipmentDetailView";
import ErrorPage from "@/views/ErrorPage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'shipments-list',
        component: ShipmentsListView,
        children: []
    },
    {
        path: '/:id(\\d+)/',
        name: 'shipment-detail',
        component: ShipmentDetailView,
        props: true,
    },
    {
        path: '*',
        name: 'error-page',
        component: ErrorPage,
        props: true,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
