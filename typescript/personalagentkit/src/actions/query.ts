import { z } from "zod";
import { CouchDBQuerySchema } from "@verida/personalagentkit";
import { BaseQueryToolConfig } from "./interfaces";
import axios from "axios";
import { BaseAction } from "./base";

/**
 *
 */
export class QueryAction extends BaseAction {
  private config: BaseQueryToolConfig;

  public name = "query_user_data";
  public description = "";
  public schema = CouchDBQuerySchema;

  /**
   *
   * @param authToken
   * @param config
   */
  constructor(authToken: string, apiEndpoint: string, config: BaseQueryToolConfig) {
    super(authToken, apiEndpoint);
    this.config = config;
    this.description = `Input to this tool is a detailed and correct CouchDB query of ${this.getConfig().extraDetail} with the following schema ${this.getConfig().schemaDefinition}.
        Only use valid CouchDB operators in the selector.  Regular expressions must use javascript syntax. Don't use case insensitive groups (?i).
        Set count=true to return the number of results, rather than the actual results. If an error is returned, rewrite the query, check the query, and try again. Default result limit is ${this.getConfig().defaultParams.limit}`;
  }

  /**
   *
   */
  public getConfig(): BaseQueryToolConfig {
    return this.config;
  }

  /**
   * Invoke this action
   *
   * @param args - Action arguments
   * @returns Action result
   */
  public async _invoke(args: z.infer<typeof CouchDBQuerySchema>): Promise<string> {
    const config = this.getConfig();

    const selector = args.selector || config.defaultParams.selector;
    const fields = args.fields || config.defaultParams.fields;
    const sort = args.sort || config.defaultParams.sort;
    const limit = args.limit || config.defaultParams.limit;
    const skip = args.skip || config.defaultParams.skip;

    let response;
    if (args.count === true) {
      response = await axios({
        method: "POST",
        url: `${this.apiEndpoint}/api/rest/v1/ds/count/${btoa(this.config.schemaUrl)}`,
        data: {
          filter: selector || {},
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        },
      });

      return response.data.count;
    } else {
      const params: any = {
        options: {
          sort,
          limit,
          skip,
          fields,
        },
      };
      if (selector) {
        params.filter = selector;
      }

      response = await axios({
        method: "POST",
        url: `https://api.verida.ai/api/rest/v1/ds/query/${btoa(this.config.schemaUrl)}`,
        data: params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        },
      });

      return JSON.stringify(response.data);
    }
  }
}
