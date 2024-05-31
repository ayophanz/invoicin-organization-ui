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
  const transformer = UserTransformer.fetch(data);
  return reject(transformer);
};

export default (id: number, data: object) => {
  const transformer = UserTransformer.send(data);
  return new Promise((resolve, reject) => {
    axios
      .put(`api/users/${id}`, transformer)
      .then((response: { data: { data: Object } }) => {
        success(response.data.data, resolve);
      })
      .catch((error: { response: { data: { errors: Object } } }) => {
        fail(error.response.data.errors, reject);
      });
  });
};
