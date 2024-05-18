import axios from "../plugins/axios";
import UserTransformer from "../transformers/userTransformer";

const success = (data: object, resolve: any) => {
  return resolve(data);
};

const fail = (data: object, reject: any) => {
  const transformer = UserTransformer.fetch(data);
  return reject(transformer);
};

export default (data: object) => {
  const transformer = UserTransformer.send(data);
  return new Promise((resolve, reject) => {
    axios
      .post("api/users", transformer)
      .then((response: { data: object }) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
