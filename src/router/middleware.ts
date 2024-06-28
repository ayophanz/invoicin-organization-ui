import { /*RouteLocationNormalized,*/ NavigationGuardNext } from "vue-router";

const beforeEach = (
  //to: RouteLocationNormalized,
  //from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  return () => {
    next();
  };
};

export default {
  beforeEach,
};
