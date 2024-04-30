import axios from '../plugins/axios';
import { useOrganizationStore } from '../stores/organization';

const success = (data: object, resolve: any) => {
    if (data) {
        const organizationStore = useOrganizationStore();
        organizationStore.setProfile(data);
        return resolve(data);
    }
};

const fail = (data: object, reject: any) => {
    return reject(data);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('api/organization/profile/show')
        .then((response) => {
            success(response.data.data, resolve);
        }).catch((error) => {
            fail(error.response.data.errors, reject);
        });
    } );
}