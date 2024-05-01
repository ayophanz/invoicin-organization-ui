import { defineStore } from 'pinia';

export const useOrganizationStore = defineStore('organization', {
    state: () => ({ 
        _profile: [],
        _addresses: []
    }),
    actions: {
        setProfile(data: object) {
            this._profile = data;
        },
        setAddresses(data: object) {
            this._addresses = data;
        }
    },
    getters: {
        getProfile() {
            return this._profile;
        },
        getAddresses() {
            return this._addresses;
        }
    },
});