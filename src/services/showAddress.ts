import axios from '../plugins/axios';
import { useOrganizationStore } from '../stores/organization';

const success = (data: object, resolve: any) => {
    if (data) {
        console.log(data);
        const organizationStore = useOrganizationStore();
        organizationStore.setAddresses(data);
        return resolve(data);
    }
};

const fail = (data: object, reject: any) => {
    return reject(data);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('api/organization/addresses')
        .then((response) => {
            success(response.data.data, resolve);
        }).catch((error) => {
            fail(error.response.data.errors, reject);
        });
    } );
}