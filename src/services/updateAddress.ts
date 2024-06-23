import axios from "../plugins/axios";
import addressTransformer from "../transformers/addressTransformer";
import { AddressTransformerFetch } from "../types/addressTransformerFetch";
import { AddressTransformerSend } from "../types/addressTransformerSend";

const success = (
  response: AddressTransformerFetch,
  resolve: (resolve: object) => void
) => {
  const transformer = addressTransformer.fetch(response);
  resolve(transformer);
};

const fail = (
  error: AddressTransformerFetch,
  reject: (reject: object) => void
) => {
  const transformer = addressTransformer.fetch(error);
  return reject(transformer);
};

export default (data: AddressTransformerSend) => {
  const transformer = addressTransformer.send(data);
  return new Promise((resolve, reject) => {
    axios
      .put("api/organization/addresses", transformer)
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
