import { Action } from "../interfaces";
import { getDataSchemas } from "../schemas/index";
import { VeridaUserInfoAction } from "./user-info";
import { QueryAction } from "./query";
import { ProfilesAction } from "./profiles";
import { DatastoreSearchAction } from "./search-datastore";
import { UniversalSearchAction } from "./search-universal";
import { ChatSearchAction } from "./search-chat";
import { DatastoreGetRecordAction } from "./get-record";

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

    queryAction.name = `Query-${schema.getName()}`;

    actions.push(queryAction);
  }

  actions.push(new VeridaUserInfoAction(authToken, apiEndpoint));
  actions.push(new ProfilesAction(authToken, apiEndpoint));
  actions.push(new DatastoreSearchAction(authToken, apiEndpoint));
  actions.push(new UniversalSearchAction(authToken, apiEndpoint));
  actions.push(new ChatSearchAction(authToken, apiEndpoint));
  actions.push(new DatastoreGetRecordAction(authToken, apiEndpoint));

  return actions;
}
