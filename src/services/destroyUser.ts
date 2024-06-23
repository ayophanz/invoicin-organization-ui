import axios from "../plugins/axios.ts";
import UserTransformer from "../transformers/userTransformer";
import { UserTransformerFetch } from "../types/userTransformerFetch.ts";

const success = (
  response: UserTransformerFetch,
  resolve: (resolve: object) => void
) => {
  const transformer = UserTransformer.fetch(response);
  resolve(transformer);
};

const fail = (
  error: UserTransformerFetch,
  reject: (reject: object) => void
) => {
  const transformer = UserTransformer.fetch(error);
  reject(transformer);
};

export default (id: number) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`api/users/${id}`)
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
