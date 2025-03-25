import { z } from "zod";
import { DatastoreGetRecordSchema } from "../interfaces";
import axios from "axios";
import { BaseAction } from "./base";

import { SCHEMAS } from "../schemas";

/**
 *
 */
export class DatastoreGetRecordAction extends BaseAction {
  public name = "get_record";
  public description =
    "This tool enables searching of specific types of user data by keywords. Input to this tool specifies keywords to search and the data type to search.";
  public schema = DatastoreGetRecordSchema;

  /**
   * Invoke this action
   *
   * @param args - Action arguments
   * @returns Action result
   */
  public async _invoke(args: z.infer<typeof DatastoreGetRecordSchema>): Promise<string> {
    const schemaUrl = SCHEMAS[args.dataType];
    const datastoreRef = btoa(schemaUrl);

    const response = await axios({
      method: "POST",
      url: `${this.apiEndpoint}/api/rest/v1/ds/get/${datastoreRef}/${args.recordId}`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authToken}`,
      },
    });

    return JSON.stringify(response.data);
  }
}
