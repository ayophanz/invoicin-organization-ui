import { defineStore } from 'pinia';

export const useOrganizationStore = defineStore('organization', {
    state: () => ({ 
        _me: [],
        _profile: []
    }),
    actions: {
        setMe(data: object) {
            this._me = data;
        },
        setProfile(data: object) {
            this._profile = data;
        }
    },
    getters: {
        getMe() {
            return this._me;
        },
        getProfile() {
            return this._profile;
        }
    },
});