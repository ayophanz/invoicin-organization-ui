import { defineStore } from "pinia";
import { EncryptStorage } from "encrypt-storage";
import { UserState } from "../types/userState";
import { AddressState } from "../types/addressState";
import { ProfileState } from "../types/profileState";

export const useOrganizationStore = defineStore("organization", {
  state: () => ({
    _profile: {} as ProfileState,
    _addresses: [] as Array<AddressState>,
    _statusCode: 200 as Number,
    _users: [] as Array<UserState>,
    _user: {} as UserState,
    _pagination: {} as Object,
  }),
  actions: {
    setProfile(data: ProfileState) {
      this._profile = data;
    },
    setAddresses(data: Array<AddressState>) {
      this._addresses = data;
    },
    setStatusCode(statusCode: number) {
      this._statusCode = statusCode;
    },
    setUsers(data: Array<UserState>) {
      this._users = data;
    },
    setUser(data: UserState) {
      this._user = data;
    },
    setPagination(data: Object) {
      this._pagination = data;
    },
  },
  getters: {
    getMe() {
      const decrypt = new EncryptStorage("G!KLH5J4E=A@", { prefix: "@me" });
      return decrypt.getItem("shared_me_state");
    },
    getCurrentRole(): Object | null {
      if (this.getMe.roles && this.getMe.roles.length > 0) {
        return this.getMe.roles[0];
      }
      return null;
    },
    getProfile(): ProfileState {
      return this._profile;
    },
    getAddresses(): Array<AddressState> {
      return this._addresses;
    },
    getStatusCode(): Object {
      return this._statusCode;
    },
    getUsers(): Array<UserState> {
      return this._users;
    },
    getUser(): UserState {
      return this._user;
    },
    getPagination(): Object {
      return this._pagination;
    },
  },
});
