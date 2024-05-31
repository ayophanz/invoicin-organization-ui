import axios from '../plugins/axios';
import { useOrganizationStore } from '../stores/organization';
import addressTransformer from '../transformers/addressTransformer';

const success = (data: object, resolve: any) => {
    if (data) {
        const transformer =  addressTransformer.fetchCollection(data);
        const organizationStore = useOrganizationStore();
        organizationStore.setAddresses(transformer);
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