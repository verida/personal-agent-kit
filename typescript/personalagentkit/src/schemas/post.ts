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
  "_id": {},
  "name": {"title": "Post name"},
  "type": {"title": "Type of post","enum": ["link", "status", "photo", "video", "music", "event", "offer", "question", "note", "album", "life_event"]},
  "content": {"title": "Post content"},
  "contentHtml": {"title": "Post content (html)",},
  "uri": {"title": "Post link",},
  "insertedAt": {"format": "date-time"},
  "sourceApplication": {"title": "Application this data is sourced"}
}
`;
  }
}

export default new PostDataSchema();
