import axios from "../plugins/axios";

const success = (response: object, resolve: (resolve: object) => void) => {
  resolve(response);
};

const fail = (error: object, reject: (reject: object) => void) => {
  reject(error);
};

export default (id: number) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`api/users/re-invite/${id}`)
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
