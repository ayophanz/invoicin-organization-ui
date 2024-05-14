import axios from "../plugins/axios";
import UserTransformer from "../transformers/userTransformer";
import { useOrganizationStore } from "../stores/organization";

const success = (response: { data: object; meta: object }, resolve: any) => {
  if (response.data) {
    const transformer = UserTransformer.fetchCollection(response.data);
    const organizationStore = useOrganizationStore();
    organizationStore.setUsers(transformer);
    if (response.meta) organizationStore.setPagination(response.meta);

    return resolve(response.data);
  }
};

const fail = (data: object, reject: any) => {
  return reject(data);
};

export default (params = "") => {
  return new Promise((resolve, reject) => {
    axios
      .get(`api/users${params}`)
      .then((response: { data: { data: object; meta: object } }) => {
        success(response.data, resolve);
      })
      .catch((error: { response: { data: { errors: object } } }) => {
        fail(error.response.data.errors, reject);
      });
  });
};
