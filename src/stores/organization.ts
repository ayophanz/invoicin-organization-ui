import { defineStore } from "pinia";

export const useOrganizationStore = defineStore("organization", {
  state: () => ({
    _profile: [],
    _addresses: [],
    _statusCode: 200,
    _users: [],
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
    },
    setUsers(data: object) {
      this._users = data;
    },
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
    },
    getUsers() {
      return this._users;
    },
  },
});
