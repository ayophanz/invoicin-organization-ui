import { defineStore } from 'pinia';

export const useOrganizationStore = defineStore('account', {
    state: () => ({ 
        _me: []
    }),
    actions: {
        me(data: object) {
            this._me = data;
        },
    },
    getters: {
        getMe() {
            return this._me;
        }
    },
});