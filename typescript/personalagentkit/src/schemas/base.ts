import { CouchDBQuerySchemaType } from "../interfaces";

export interface BaseDataSchema {
  getName(): string;
  getUrl(): string;
  getLabel(): string;
  getDescription(): string;
  getDefaultQueryParams(): Partial<CouchDBQuerySchemaType>;
  getQuerySchemaString(): string;
  getTimestampField(): string;
}
