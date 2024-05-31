import axios from "../plugins/axios";

const success = (data: object, resolve: any) => {
  return resolve(data);
};

const fail = (data: object, reject: any) => {
  return reject(data);
};

export default (id: number) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`api/users/re-invite/${id}`)
      .then((response: { data: object }) => {
        success(response.data, resolve);
      })
      .catch((error: { response: { data: { errors: object } } }) => {
        fail(error.response.data.errors, reject);
      });
  });
};
