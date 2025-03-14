import { BaseDataSchema } from "./base";
import { SCHEMAS } from "../schemas";
import { CouchDBQuerySchemaType } from "../interfaces";

/**
 *
 */
class EmailDataSchema implements BaseDataSchema {
  /**
   *
   */
  public getUrl(): string {
    return SCHEMAS.EMAIL;
  }

  /**
   *
   */
  public getTimestampField(): string {
    return "sentAt";
  }

  /**
   *
   */
  public getName(): string {
    return "Email";
  }

  /**
   *
   */
  public getLabel(): string {
    return "Email";
  }

  /**
   *
   */
  public getDescription(): string {
    return "my emails";
  }

  /**
   *
   */
  public getDefaultQueryParams(): Partial<CouchDBQuerySchemaType> {
    return {
      fields: [
        "_id",
        "name",
        "type",
        "fromName",
        "fromEmail",
        "messageText",
        "sentAt",
        "sourceApplication",
      ],
      sort: [{ sentAt: "desc" }],
      limit: 20,
    };
  }

  /**
   *
   */
  public getQuerySchemaString(): string {
    return `
{
    "_id": {"type": "string"},
    "name": {"description": "Email subject"},
    "type": {"description": "Message sender (sent by me, received by me)", "type": "string", "enum": ["send", "receive"]},
    "fromName": {"description": "Sender name"},
    "fromEmail": {"description": "Sender address"},
    "messageText": {"description": "Content of the email as text"},
    "sentAt": {"type": "string","format": "date-time"},
    "sourceApplication": {"description": "Name of the application this data was sourced from"}
}
`;
  }
}

export default new EmailDataSchema();
