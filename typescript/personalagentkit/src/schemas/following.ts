import { BaseDataSchema } from "./base";
import { SCHEMAS } from "../schemas";
import { CouchDBQuerySchemaType } from "../interfaces";

const MAX_DESCRIPTION = 255;

/**
 *
 */
class FollowingDataSchema implements BaseDataSchema {
  /**
   *
   */
  public getUrl(): string {
    return SCHEMAS.FOLLOWING;
  }

  /**
   *
   */
  public getTimestampField(): string {
    return "followedTimestamp";
  }

  /**
   *
   */
  public getName(): string {
    return "Following";
  }

  /**
   *
   */
  public getLabel(): string {
    return "Social Following";
  }

  /**
   *
   */
  public getDescription(): string {
    return "who I follow on social media";
  }

  /**
   *
   */
  public getStoreFields(): string[] {
    return ["_id", "name", "uri", "description", "insertedAt", "followedTimestamp"];
  }

  /**
   *
   */
  public getIndexFields(): string[] {
    return ["name", "description", "sourceApplication"];
  }

  /**
   *
   */
  public getDefaultQueryParams(): Partial<CouchDBQuerySchemaType> {
    return {
      fields: ["_id", "name", "uri", "followedTimestamp", "sourceApplication"],
      sort: [{ followedTimestamp: "desc" }],
    };
  }

  /**
   *
   */
  public getQuerySchemaString(): string {
    return `
{
  "_id": {},
  "name": {"title": "Name of who is followed"},
  "uri": {"title": "External link"},
  "followedTimestamp": {"format": "date-time"},
  "sourceApplication": {"title": "Application this data is sourced"}
}
`;
  }
}

export default new FollowingDataSchema();
