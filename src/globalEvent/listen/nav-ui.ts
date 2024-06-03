import { useOrganizationStore } from "../../stores/organization";
const prefix = "organization-ui";

export const me = () => {
  const organizationStore = useOrganizationStore();
  const eventName = `${prefix}_me`;

  window.addEventListener(eventName, (e: any) => {
    window.removeEventListener(eventName, null);
    console.log(e.detail);
    // organizationStore.setMe(e.detail);
  });
};

export default {
  me,
};
