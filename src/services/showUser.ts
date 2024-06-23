import axios from "../plugins/axios";
import UserTransformer from "../transformers/userTransformer";
import { useOrganizationStore } from "../stores/organization";
import { UserTransformerFetch } from "../types/userTransformerFetch";

const success = (
  response: UserTransformerFetch,
  resolve: (resolve: object) => void
) => {
  if (response) {
    const transformer = UserTransformer.fetch(response);
    const organizationStore = useOrganizationStore();
    organizationStore.setUser(transformer);
    resolve(transformer);
  }
};

const fail = (
  error: UserTransformerFetch,
  reject: (reject: object) => void
) => {
  reject(error);
};

export default (id: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`api/users/${id}`)
      .then((response) => {
        success(response.data.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
