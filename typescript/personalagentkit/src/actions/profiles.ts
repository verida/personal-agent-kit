import { ProfileSchemaType } from "@verida/personalagentkit";
import axios from "axios";
import { BaseAction } from "./base";

/**
 *
 */
export class ProfilesAction extends BaseAction {
  public name = "verida_profiles";
  public description =
    "This tool provides information on all the user's connected profiles (ie: google, telegram, discord etc.)";

  /**
   * Invoke this action
   *
   * @param args - Action arguments
   * @returns Action result
   */
  public async _invoke(args: ProfileSchemaType): Promise<string> {
    const response = await axios({
      method: "GET",
      url: `${this.apiEndpoint}/api/rest/v1/connections/profiles${args.providerId ? `?providerId=${args.providerId}` : ``}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authToken}`,
      },
    });

    return JSON.stringify(response.data);
  }
}
