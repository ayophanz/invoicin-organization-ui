export type UserState = {
  id: number;
  prettyId: number;
  firstname: string;
  lastname: string;
  email: string;
  emailVerified: string;
  role: string[];
  permissions: { name: string }[];
  image: string;
  defaultImage: { initial: string; bg_color: string };
};
