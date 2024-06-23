import axios from "../plugins/axios";
import UserTransformer from "../transformers/userTransformer";
import { useOrganizationStore } from "../stores/organization";
import { UserTransformerFetch } from "../types/userTransformerFetch";

const success = (
  response: { data: UserTransformerFetch; meta: object },
  resolve: (resolve: object) => void
) => {
  if (response.data) {
    const transformer = UserTransformer.fetchCollection(response.data);
    const organizationStore = useOrganizationStore();
    organizationStore.setUsers(transformer);
    if (response.meta) organizationStore.setPagination(response.meta);

    resolve(transformer);
  }
};

const fail = (
  error: UserTransformerFetch,
  reject: (reject: object) => void
) => {
  reject(error);
};

export default (params = "") => {
  return new Promise((resolve, reject) => {
    axios
      .get(`api/users${params}`)
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
