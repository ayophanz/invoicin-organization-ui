import axios from "../plugins/axios";
import { useOrganizationStore } from "../stores/organization";
import addressTransformer from "../transformers/addressTransformer";
import { AddressTransformerFetch } from "../types/addressTransformerFetch";

const success = (
  response: AddressTransformerFetch,
  resolve: (resolve: object) => void
) => {
  if (response) {
    const transformer = addressTransformer.fetchCollection(response);
    const organizationStore = useOrganizationStore();
    organizationStore.setAddresses(transformer);
    resolve(transformer);
  }
};

const fail = (
  error: AddressTransformerFetch,
  reject: (reject: object) => void
) => {
  reject(error);
};

export default () => {
  return new Promise((resolve, reject) => {
    axios
      .get("api/organization/addresses")
      .then((response) => {
        success(response.data.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
