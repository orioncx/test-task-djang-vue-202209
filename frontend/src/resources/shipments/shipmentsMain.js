import axios from "axios";
import {SERVICE_URL} from "@/config";

const endpointUrl = `${SERVICE_URL}/shipments/`;

const shipmentsMainResource = {
    list(params) {
        return axios.get(endpointUrl, {params});
    },
    one(id) {
        return axios.get(`${endpointUrl}${id}/`);
    },
    create(data) {
        return axios({
            url: endpointUrl,
            method: 'post',
            data,
        })
    },
    delete(id) {
        return axios({
            url: `${endpointUrl}${id}/`,
            method: 'delete',
        })
    },
    update(id, data) {
        return axios({
            url: `${endpointUrl}${id}/`,
            method: 'patch',
            data,
        })
    }
}

export default shipmentsMainResource;