import { Action } from "../interfaces";
import { getDataSchemas } from "../schemas/index";
import { QueryAction } from "./query";

/**
 *
 * @param authToken - Verida Auth Token
 * @param apiEndpoint - Verida API Endpoint
 */
export function getActions(authToken: string, apiEndpoint: string): Action[] {
  const actions: Action[] = [];

  const schemas = getDataSchemas();
  for (const schema of schemas) {
    const queryAction = new QueryAction(authToken, apiEndpoint, {
      schemaDefinition: schema.getQuerySchemaString(),
      schemaUrl: schema.getUrl(),
      defaultParams: schema.getDefaultQueryParams(),
      extraDetail: schema.getDescription(),
    });

    actions.push(queryAction);
  }

  return actions;
}
