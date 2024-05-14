import { defineStore } from "pinia";

export const useOrganizationStore = defineStore("organization", {
  state: () => ({
    _profile: {},
    _addresses: [],
    _statusCode: 200,
    _users: [],
    _pagination: {},
  }),
  actions: {
    setProfile(data: Object) {
      this._profile = data;
    },
    setAddresses(data: Array<any>) {
      this._addresses = data;
    },
    setStatusCode(statusCode: number) {
      this._statusCode = statusCode;
    },
    setUsers(data: Array<any>) {
      this._users = data;
    },
    setPagination(data: Object) {
      this._pagination = data;
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
    getPagination() {
      return this._pagination;
    },
  },
});
