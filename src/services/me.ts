import axios from '../plugins/axios';
import { useOrganizationStore } from '../stores/organization';

const success = (response: object, resolve: any) => {
    if (response) {
        const organizationStore = useOrganizationStore();
        organizationStore.me(response);
        return resolve(response);
    }
};

const fail = (error: object, reject: any) => {
    return reject(error);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('api/account/show')
        .then((response) => {
            success(response.data.data, resolve);
        })
        .catch((error) => {
            fail(error, reject);
        })
    });
}