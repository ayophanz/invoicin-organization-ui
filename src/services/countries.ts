import axios from "../plugins/axios";

const success = (response: object, resolve: (resolve: object) => void) => {
  resolve(response);
};

const fail = (response: object, reject: (reject: object) => void) => {
  reject(response);
};

export default () => {
  return new Promise((resolve, reject) => {
    axios
      .get("api/account/countries")
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        console.log(error);
        fail(error, reject);
      });
  });
};
