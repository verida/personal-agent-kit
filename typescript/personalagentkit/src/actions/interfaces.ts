import { z } from "zod";
import { CouchDBQuerySchemaType } from "@verida/personalagentkit";

export interface BaseQueryToolConfig {
  schemaDefinition: string;
  schemaUrl: string;
  defaultParams: Partial<CouchDBQuerySchemaType>;
  extraDetail: string;
}
