import { defineStore } from 'pinia';

export const useOrganizationStore = defineStore('organization', {
    state: () => ({ 
        _profile: []
    }),
    actions: {
        setProfile(data: object) {
            this._profile = data;
        }
    },
    getters: {
        getProfile() {
            return this._profile;
        }
    },
});