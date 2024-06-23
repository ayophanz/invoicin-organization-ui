export type UserTransformerFetch = {
  id: number;
  pretty_id: number;
  image: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string[];
  email_verified_at: string;
  created_at: string;
  permissions: { name: string }[];
  default_image: { initial: string; bg_color: string };
};
