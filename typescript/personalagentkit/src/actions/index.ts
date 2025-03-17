import { Action } from "../interfaces";
import { getDataSchemas } from "../schemas/index";
import { VeridaUserInfoAction } from "./user-info";
import { QueryAction } from "./query";
import { ProfilesAction } from "./profiles";

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

    queryAction.name = schema.getName();

    actions.push(queryAction);
  }

  actions.push(new VeridaUserInfoAction(authToken, apiEndpoint));
  actions.push(new ProfilesAction(authToken, apiEndpoint));

  return actions;
}
