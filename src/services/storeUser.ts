import axios from "../plugins/axios";
import UserTransformer from "../transformers/userTransformer";
import { UserTransformerFetch } from "../types/userTransformerFetch";
import { UserTransformerSend } from "../types/userTransformerSend";

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

export default (data: UserTransformerSend) => {
  const transformer = UserTransformer.send(data);
  return new Promise((resolve, reject) => {
    axios
      .post("api/users", transformer)
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
