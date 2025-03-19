import { BaseDataSchema } from "./base";
import { SCHEMAS } from "../schemas";
import { CouchDBQuerySchemaType } from "../interfaces";

const MAX_FILE_LENGTH = 10000;

/**
 *
 */
class FileDataSchema implements BaseDataSchema {
  /**
   *
   */
  public getUrl(): string {
    return SCHEMAS.FILE;
  }

  /**
   *
   */
  public getTimestampField(): string {
    return "insertedAt";
  }

  /**
   *
   * @param row
   */
  public getGroupId(row: any): string | undefined {
    return undefined;
  }

  /**
   *
   */
  public getName(): string {
    return "File";
  }

  /**
   *
   */
  public getLabel(): string {
    return "File";
  }

  /**
   *
   */
  public getDescription(): string {
    return "my files and documents";
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
    return [
      "name",
      "contentText",
      "indexableText",
      "sourceApplication",
      "modifiedAt",
      "insertedAt",
    ];
  }

  /**
   *
   */
  public getDefaultQueryParams(): Partial<CouchDBQuerySchemaType> {
    return {
      fields: [
        "_id",
        "name",
        "size",
        "contentText",
        "uri",
        "extension",
        "mimeType",
        "insertedAt",
        "sourceApplication",
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
  "name": {"name": "File name"},
  "extension": {"title": "File Extension"},
  "mimeType": {},
  "size": {"title": "Size (bytes)"},
  "contentText": {},
  "uri": {"description": "External link to the file (optional)"},
  "insertedAt": {"format": "date-time"},
  "sourceApplication": {"title": "Application this data is sourced"}
}
`;
  }
}

export default new FileDataSchema();
