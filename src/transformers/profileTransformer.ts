/* ============
 * Profile Transformer
 * ============
 *
 * The transformer for the profile.
 */

import Transformer from "./transformer";
import { ProfileTransformerFetch } from "../types/profileTransformerFetch";
import { ProfileTransformerSend } from "../types/profileTransformerSend";

export default class ProfileTransformer extends Transformer {
  static fetch(item: ProfileTransformerFetch) {
    return {
      logo: item.logo,
      name: item.name,
      email: item.email,
    };
  }

  static send(item: ProfileTransformerSend) {
    return {
      logo: item.logo,
      name: item.name,
      email: item.email,
    };
  }
}
