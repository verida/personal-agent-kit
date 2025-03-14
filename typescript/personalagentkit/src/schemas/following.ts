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
    "_id": {
        "title": "ID",
        "description": "Unique ID of this record",
        "type": "string",
    },
    "name": {
        "title": "Name",
        "description": "Name of who is followed",
        "type": "string",
    },
    "uri": {
        "title": "URI",
        "type": "string"
    },
    "followedTimestamp": {
        "title": "Followed timestamp",
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

export default new FollowingDataSchema();
