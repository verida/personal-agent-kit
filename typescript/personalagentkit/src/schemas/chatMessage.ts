import { BaseDataSchema } from "./base";
import { SCHEMAS } from "../schemas";
import { CouchDBQuerySchemaType } from "../interfaces";

/**
 *
 */
class ChatMessageDataSchema implements BaseDataSchema {
  /**
   *
   */
  public getUrl(): string {
    return SCHEMAS.CHAT_MESSAGE;
  }

  /**
   *
   */
  public getName(): string {
    return "ChatMessage";
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
  public getLabel(): string {
    return "Chat Message";
  }

  /**
   *
   */
  public getDescription(): string {
    return "my chat messages";
  }

  /**
   *
   */
  public getDefaultQueryParams(): Partial<CouchDBQuerySchemaType> {
    return {
      fields: [
        "_id",
        "messageText",
        "type",
        "fromHandle",
        "fromName",
        "groupName",
        "groupId",
        "sentAt",
        "sourceApplication",
      ],
      sort: [{ sentAt: "desc" }],
    };
  }

  /**
   *
   */
  public getQuerySchemaString(): string {
    return `
{
    "groupId": {
        "title": "Chat Group ID",
        "type": "string"
    },
    "groupName": {
        "title": "Chat Group Name",
        "type": "string"
    },
    "type": {
        "title": "Type",
        "description": "Type of message (send, receive)",
        "type": "string",
        "enum": ["send", "receive"]
    },
    "messageText": {
        "title": "Message (Text)",
        "type": "string"
    },
    "messageHTML": {
        "title": "Message (HTML)",
        "type": "string"
    },
    "fromId": {
        "title": "From ID",
        "type": "string"
    },
    "fromHandle": {
        "title": "From Handle",
        "type": "string"
    },
    "fromName": {
        "title": "From Name",
        "type": "string"
    },
    "sentAt": {
        "title": "Sent at",
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

export default new ChatMessageDataSchema();
