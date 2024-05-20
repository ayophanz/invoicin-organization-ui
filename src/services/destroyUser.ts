import axios from "../plugins/axios";
import UserTransformer from "../transformers/userTransformer";

const success = (data: object, resolve: any) => {
  return resolve(data);
};

const fail = (data: object, reject: any) => {
  const transformer = UserTransformer.fetch(data);
  return reject(transformer);
};

export default (id: number) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`api/users/${id}`)
      .then((response: { data: object }) => {
        success(response.data, resolve);
      })
      .catch((error: { response: { data: { errors: object } } }) => {
        fail(error.response.data.errors, reject);
      });
  });
};
