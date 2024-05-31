import axios from "../plugins/axios";
import UserTransformer from "../transformers/userTransformer";
import { useOrganizationStore } from "../stores/organization";

const success = (response: object, resolve: any) => {
  if (response) {
    const transformer = UserTransformer.fetch(response);
    const organizationStore = useOrganizationStore();
    organizationStore.setUser(transformer);
    return resolve(response);
  }
};

const fail = (data: object, reject: any) => {
  return reject(data);
};

export default (id: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`api/users/${id}`)
      .then((response: { data: { data: object } }) => {
        success(response.data.data, resolve);
      })
      .catch((error: { response: { data: { errors: object } } }) => {
        fail(error.response.data.errors, reject);
      });
  });
};
