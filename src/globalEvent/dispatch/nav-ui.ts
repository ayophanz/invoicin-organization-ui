const prefix = "nav-ui";

export const logo = (data: Object) => {
  const eventName = `${prefix}_logo`;

  const event = new CustomEvent(eventName, {
    detail: data,
  } as object);
  window.dispatchEvent(event);
};

export default {
  logo,
};
