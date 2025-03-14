import { BaseDataSchema } from "./base";
import { SCHEMAS } from "../schemas";
import { CouchDBQuerySchemaType } from "../interfaces";

/**
 *
 */
class PostDataSchema implements BaseDataSchema {
  /**
   *
   */
  public getUrl(): string {
    return SCHEMAS.POST;
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
    return "SocialPost";
  }

  /**
   *
   */
  public getLabel(): string {
    return "Social Post";
  }

  /**
   *
   */
  public getDescription(): string {
    return "my social media posts";
  }

  /**
   *
   */
  public getDefaultQueryParams(): Partial<CouchDBQuerySchemaType> {
    return {
      fields: ["_id", "name", "type", "content", "uri", "sourceApplication"],
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
        "description": "Name of post",
        "type": "string",
    },
    {
    "type": {
        "title": "Type",
        "description": "Type of post",
        "type": "string",
        "enum": ["link", "status", "photo", "video", "music", "event", "offer", "question", "note", "album", "life_event"]
    },
    "content": {
        "title": "Content",
        "description": "Content of the post",
        "type": "string"
    },
    "contentHtml": {
        "title": "Content (html)",
        "description": "HTML formatted version of the post",
        "type": "string"
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

export default new PostDataSchema();
