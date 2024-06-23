/* ============
 * User Transformer
 * ============
 *
 * The transformer for the user.
 */

import Transformer from "./transformer";
import { UserTransformerFetch } from "../types/userTransformerFetch";
import { UserTransformerSend } from "../types/userTransformerSend";

export default class UserTransformer extends Transformer {
  static fetch(item: UserTransformerFetch) {
    return {
      id: item.id,
      prettyId: item.pretty_id,
      firstname: item.first_name,
      lastname: item.last_name,
      defaultImage: item.default_image,
      image: item.image,
      email: item.email,
      emailVerified: item.email_verified_at,
      createdAt: item.created_at,
      role: item.role,
      permissions: item.permissions,
    };
  }

  static send(item: UserTransformerSend) {
    return {
      first_name: item.firstname,
      last_name: item.lastname,
      email: item.email,
      role: item.role,
      access_organization: item.accessOrganization,
      access_customer: item.accessCustomer,
      access_product: item.accessProduct,
    };
  }
}
