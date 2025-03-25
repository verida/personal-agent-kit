import { z } from "zod";
import { DatastoreSearchSchema } from "../interfaces";
import axios from "axios";
import { BaseAction } from "./base";

import { SCHEMAS } from "../schemas";
import { getDataSchemasDict } from "../schemas/index";

/**
 *
 */
export class DatastoreSearchAction extends BaseAction {
  public name = "search_user_data";
  public description =
    "This tool enables searching of specific types of user data by keywords. Input to this tool specifies keywords to search and the data type to search.";
  public schema = DatastoreSearchSchema;

  /**
   * Invoke this action
   *
   * @param args - Action arguments
   * @returns Action result
   */
  public async _invoke(args: z.infer<typeof DatastoreSearchSchema>): Promise<string> {
    const schemaUrl = SCHEMAS[args.dataType];
    const datastoreRef = btoa(schemaUrl);
    const schemasList = getDataSchemasDict();
    const schema = schemasList[schemaUrl];

    const response = await axios({
      method: "POST",
      url: `https://${this.apiEndpoint}/api/rest/v1/search/datastore/${datastoreRef}`,
      data: {
        keywords: args.keywords,
        limit: args.limit ? args.limit : 20,
        skip: args.skip ? args.skip : undefined,
        indexFields: schema.getIndexFields(),
        storeFields: schema.getStoreFields(),
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authToken}`,
      },
    });

    return JSON.stringify(response.data);
  }
}
