import { z } from "zod";
import { Action } from "@verida/personalagentkit";
import { CouchDBQuerySchema, BaseQueryToolConfig } from "./interfaces";
import axios from "axios"

/**
 *
 */
export class QueryAction implements Action {
    private config: BaseQueryToolConfig
    private authToken: string

    name = "query_user_data";
    description = "";
    schema = CouchDBQuerySchema;

    constructor(authToken: string, config: BaseQueryToolConfig) {
        this.authToken = authToken
        this.config = config
        this.description = `Input to this tool is a detailed and correct CouchDB query of ${this.getConfig().extraDetail} with the following schema ${this.getConfig().schemaDefinition}.
        Ensure you only use valid CouchDB operators in the selector. Any regular expressions must use javascript syntax. Don't use case insensitive groups (?i) as they are not supported.
        Set count=true to return the number of matching results, rather than the results themselves.
        If the query is not correct, an error message will be returned.
        If an error is returned, rewrite the query, check the query, and try again.
        The default result limit is ${this.getConfig().defaultParams.limit}`
      }

  public getConfig(): BaseQueryToolConfig {
    return this.config
  }

  /**
   * Invoke this action
   *
   * @param args - Action arguments
   * @returns Action result
   */
  public async invoke(args: z.infer<typeof CouchDBQuerySchema>): Promise<string> {
    const config = this.getConfig()

    let selector = args.selector || config.defaultParams.selector
    let fields = args.fields || config.defaultParams.fields
    let sort = args.sort || config.defaultParams.sort
    let limit = args.limit || config.defaultParams.limit
    let skip = args.skip || config.defaultParams.skip

    let response
    if (args.count === true) {
        response = await axios({
            method: 'POST',
            url: `https://api.verida.ai/api/rest/v1/ds/count/${btoa(this.config.schemaUrl)}`,
            data: {
                filter: selector || {}
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authToken}`
            }
        })

        console.log(response.data)
        return response.data.count;
    } else {
        const params: any = {
            options: {
                sort,
                limit,
                skip,
                fields
            }
        }
        if (selector) {
            params.filter = selector
        }

        response = await axios({
            method: 'POST',
            url: `https://api.verida.ai/api/rest/v1/ds/query/${btoa(this.config.schemaUrl)}`,
            data: params,
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.authToken}`
            }
        })

        console.log(response.data)
        return JSON.stringify(response.data);
    }
  }
}
