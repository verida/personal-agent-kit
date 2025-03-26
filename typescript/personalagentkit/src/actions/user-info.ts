import axios from "axios";
import { BaseAction } from "./base";

/**
 *
 */
export class VeridaUserInfoAction extends BaseAction {
  public name = "verida_user_info";
  public description =
    "This tool provides a summary of all the permissions granted to access the user's data stored in Verida and their account ID (DID).";

  /**
   * Invoke this action
   *
   * @returns Action result
   */
  public async _invoke(): Promise<string> {
    const response = await axios({
      method: "GET",
      url: `${this.apiEndpoint}/api/rest/v1/auth/token?tokenId=${this.authToken}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authToken}`,
      },
    });

    return JSON.stringify(response.data);
  }
}
