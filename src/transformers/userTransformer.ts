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
      editOrganization: item.edit_organization,
      editCustomer: item.edit_customer,
      editProduct: item.edit_product,
    };
  }

  static send(item: any) {
    return {
      first_name: item.firstname,
      last_name: item.lastname,
      email: item.email,
      role: item.role,
      edit_organization: item.editOrganization,
      edit_customer: item.editCustomer,
      edit_product: item.editProduct
    };
  }
}