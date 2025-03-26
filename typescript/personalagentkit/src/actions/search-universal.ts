import { z } from "zod";
import { KeywordSearchSchema } from "../interfaces";
import axios from "axios";
import { BaseAction } from "./base";

/**
 *
 */
export class UniversalSearchAction extends BaseAction {
  public name = "universal_search_user_data";
  public description =
    "This tool enables searching of all user data by keywords. Input to this tool specifies keywords to search.";
  public schema = KeywordSearchSchema;

  /**
   * Invoke this action
   *
   * @param args - Action arguments
   * @returns Action result
   */
  public async _invoke(args: z.infer<typeof KeywordSearchSchema>): Promise<string> {
    const response = await axios({
      method: "GET",
      url: `${this.apiEndpoint}/api/rest/v1/search/universal?keywords=${args.keywords}&limit=${args.limit ? args.limit : 20}&skip=${args.skip ? args.skip : 0}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authToken}`,
      },
    });

    return JSON.stringify(response.data);
  }
}
