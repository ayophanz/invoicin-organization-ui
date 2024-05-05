import { defineStore } from 'pinia';

export const useOrganizationStore = defineStore('organization', {
    state: () => ({ 
        _profile: [],
        _addresses: [],
        _statusCode: 200
    }),
    actions: {
        setProfile(data: object) {
            this._profile = data;
        },
        setAddresses(data: object) {
            this._addresses = data;
        },
        setStatusCode(statusCode: number) {
            this._statusCode = statusCode;
        }
    },
    getters: {
        getProfile() {
            return this._profile;
        },
        getAddresses() {
            return this._addresses;
        },
        getStatusCode() {
            return this._statusCode;
        }
    },
});