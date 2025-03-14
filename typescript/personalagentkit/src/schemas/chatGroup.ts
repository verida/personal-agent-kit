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
                "_id": {
                    "title": "ID",
                    "description": "Unique ID of this record",
                    "type": "string",
                },
                "name": {
                    "title": "Name",
                    "description": "Name of the chat group",
                    "type": "string",
                },
                "description": {
                    "title": "Description",
                    "description": "Description of the chat group",
                    "type": "string",
                },
                "uri": {
                    "title": "URI",
                    "type": "string"
                },
                "insertedAt": {
                    "title": "Inserted",
                    "description": "Date/time this record was inserted",
                    "type": "string",
                    "format": "date-time"
                },
  "sourceApplication": {
            "title": "Source application",
            "description": "Name of the application this data was sourced from",
            "type": "string"
    }
            }
`;
  }
}

export default new ChatGroupDataSchema();
