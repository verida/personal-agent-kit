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
    "_id": {
        "title": "ID",
        "description": "Unique ID of this record",
        "type": "string",
    },
    "name": {
        "name": "File name",
        "type": "string",
        "description": "File name"
    },
    "extension": {
        "title": "Extension",
        "type": "string",
        "description": "File extension of the document (ie: png)"
    },
    "mimeType": {
        "title": "MIME Type",
        "type": "string",
        "description": "MIME type of the file"
    },
    "size": {
        "title": "Size",
        "type": "integer",
        "description": "Size of the document in bytes"
    },
    "contentText": {
        "title": "Content (Text)",
        "type": "string",
        "description": "Text content of the file (if relevant)"
    },
    "uri": {
        "title": "URI",
        "type": "string",
        "description": "External link to the document (optional)"
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

export default new FileDataSchema();
