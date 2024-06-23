import axios from "../plugins/axios";
import UserTransformer from "../transformers/userTransformer";
import { useOrganizationStore } from "../stores/organization";
import { UserTransformerFetch } from "../types/userTransformerFetch";
import { UserTransformerSend } from "../types/userTransformerSend";

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
  const transformer = UserTransformer.fetch(error);
  reject(transformer);
};

export default (id: number, data: UserTransformerSend) => {
  const transformer = UserTransformer.send(data);
  return new Promise((resolve, reject) => {
    axios
      .put(`api/users/${id}`, transformer)
      .then((response) => {
        success(response.data.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
