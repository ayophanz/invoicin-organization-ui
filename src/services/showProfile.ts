import axios from "../plugins/axios";
import { useOrganizationStore } from "../stores/organization";
import ProfileTransformer from "../transformers/profileTransformer";
import { ProfileTransformerFetch } from "../types/profileTransformerFetch";

const success = (
  response: ProfileTransformerFetch,
  resolve: (resolve: object) => void
) => {
  if (response) {
    const transformer = ProfileTransformer.fetch(response);
    const organizationStore = useOrganizationStore();
    organizationStore.setProfile(transformer);
    resolve(transformer);
  }
};

const fail = (
  error: ProfileTransformerFetch,
  reject: (reject: object) => void
) => {
  const transformer = ProfileTransformer.fetch(error);
  reject(transformer);
};

export default () => {
  return new Promise((resolve, reject) => {
    axios
      .get("api/organization/profile/show")
      .then((response) => {
        success(response.data.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
