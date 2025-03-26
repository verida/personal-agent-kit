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
  public getStoreFields(): string[] {
    return ["_id", "insertedAt"];
  }

  /**
   *
   */
  public getIndexFields(): string[] {
    return ["name", "favouriteType", "uri", "contentType", "description", "sourceApplication"];
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
  "_id": {},
  "name": {"title": "Favourite name"},
  "favouriteType": {"enum": ["like", "favourite", "recommendation", "share"]},
  "contentType": {"enum": ["video", "audio", "document", "webpage"]},
  "uri": {"title": "External link"},
  "insertedAt": {"format": "date-time"},
  "sourceApplication": {"title": "Application this data is sourced"}
}
`;
  }
}

export default new FavouriteDataSchema();
