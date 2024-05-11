/* ============
 * User Transformer
 * ============
 *
 * The transformer for the user.
 */

import Transformer from './transformer';

export default class UserTransformer extends Transformer {

  static fetch(item: any) {
    return {
      firstname: item.first_name,
      lastname: item.last_name,
      email: item.email,
      role: item.role,
      accessOrganization: item.access_organization,
      accessCustomer: item.access_customer,
      accessProduct: item.access_product,
    };
  }

  static send(item: any) {
    return {
      first_name: item.firstname,
      last_name: item.lastname,
      email: item.email,
      role: item.role,
      access_organization: item.accessOrganization,
      access_customer: item.accessCustomer,
      access_product: item.accessProduct
    };
  }
}