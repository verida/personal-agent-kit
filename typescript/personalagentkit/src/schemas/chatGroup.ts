import { BaseDataSchema } from "./base";
import { SCHEMAS } from "../schemas";
import { CouchDBQuerySchemaType } from "../interfaces";

/**
 *
 */
class ChatGroupDataSchema implements BaseDataSchema {
  /**
   *
   */
  public getUrl(): string {
    return SCHEMAS.CHAT_GROUP;
  }

  /**
   *
   */
  public getTimestampField(): string {
    return "insertedAt";
  }

  /**
   *
   */
  public getName(): string {
    return "ChatGroup";
  }

  /**
   *
   */
  public getLabel(): string {
    return "Chat Group";
  }

  /**
   *
   */
  public getDescription(): string {
    return "my chat groups";
  }

  /**
   *
   */
  public getStoreFields(): string[] {
    return ["_id", "name", "description", "insertedAt"];
  }

  /**
   *
   */
  public getIndexFields(): string[] {
    return ["name", "description", "insertedAt"];
  }

  /**
   *
   */
  public getDefaultQueryParams(): Partial<CouchDBQuerySchemaType> {
    return {
      fields: ["_id", "name", "description", "uri", "insertedAt", "sourceApplication"],
      sort: [{ insertedAt: "desc" }],
    };
  }

  /**
   *
   */
  public getQuerySchemaString(): string {
    return `
{
  "_id": {},
  "name": {"description": "Chat group name"},
  "description": {},
  "uri": {"title": "Group link"},
  "insertedAt": {"format": "date-time"},
  "sourceApplication": {"title": "Application this data is sourced"},
}`;
  }
}

export default new ChatGroupDataSchema();
