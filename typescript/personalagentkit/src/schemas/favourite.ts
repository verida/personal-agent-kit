import { BaseDataSchema } from "./base";
import { SCHEMAS } from "../schemas";
import { CouchDBQuerySchemaType } from "../interfaces";

/**
 *
 */
class FavouriteDataSchema implements BaseDataSchema {
  /**
   *
   */
  public getUrl(): string {
    return SCHEMAS.FAVOURITE;
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
    return "Favourite";
  }

  /**
   *
   */
  public getLabel(): string {
    return "Favourite";
  }

  /**
   *
   */
  public getDescription(): string {
    return "my favourites";
  }

  /**
   *
   */
  public getDefaultQueryParams(): Partial<CouchDBQuerySchemaType> {
    return {
      fields: [
        "_id",
        "name",
        "favouriteType",
        "uri",
        "contentType",
        "description",
        "sourceApplication",
        "insertedAt",
      ],
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
      "description": "Favourite name / label",
      "type": "string"
  },
   "favouriteType": {
        "title": "Favourite Type",
        "description": "Type of favourite",
        "type": "string",
        "enum": ["like", "favourite", "recommendation", "share"]
    },
    "contentType": {
        "title": "Content Type",
        "description": "Type of post",
        "type": "string",
        "enum": ["video", "audio", "document", "webpage"]
    },
    "uri": {
        "title": "URI",
        "type": "string"
    },
  "insertedAt": {
      "title": "Source data",
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

export default new FavouriteDataSchema();
