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
  public getStoreFields(): string[] {
    return ["_id", "groupId", "sentAt"];
  }

  /**
   *
   */
  public getIndexFields(): string[] {
    return [
      "messageText",
      "fromHandle",
      "fromName",
      "groupName",
      "groupId",
      "indexableText",
      "sentAt",
      "sourceApplication",
    ];
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
  "groupId": {"title": "Chat Group ID"},
  "groupName": {"title": "Chat Group Name"},
  "type": {"description": "Message sender (sent by me, received by me)", "type": "string", "enum": ["send", "receive"]},
  "messageText": {},
  "messageHTML": {},
  "fromId": {"title": "From User ID"},
  "fromHandle": {"title": "From User Handle"},
  "fromName": {},
  "sentAt": {"format": "date-time"},
  "sourceApplication": {"title": "Application this data is sourced"}
}
`;
  }
}

export default new ChatMessageDataSchema();
