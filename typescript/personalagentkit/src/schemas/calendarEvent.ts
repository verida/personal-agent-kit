import { BaseDataSchema } from "./base";
import { CouchDBQuerySchemaType } from "../interfaces";
import { SCHEMAS } from "../schemas";

/**
 *
 */
class CalendarEventDataSchema implements BaseDataSchema {
  /**
   *
   */
  public getUrl(): string {
    return SCHEMAS.EVENT;
  }

  /**
   *
   */
  public getTimestampField(): string {
    return "start.dateTime";
  }

  /**
   *
   */
  public getName(): string {
    return "CalendarEvent";
  }

  /**
   *
   */
  public getLabel(): string {
    return "Calendar Event";
  }

  /**
   *
   */
  public getDescription(): string {
    return "my calendar events";
  }

  /**
   *
   */
  public getStoreFields(): string[] {
    return ["_id", "insertedAt", "start.dateTime", "schema"];
  }

  /**
   *
   */
  public getIndexFields(): string[] {
    // @todo: Support indexing attachments, creator, organizer and attendees
    return [
      "name",
      "description",
      "location",
      "status",
      "modifiedAt",
      "insertedAt",
      "start.dateTime",
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
        "status",
        "description",
        "calendarId",
        "location",
        "creator",
        "start",
        "end",
        "sourceApplication",
      ],
      sort: [{ "start.dateTime": "desc" }],
    };
  }

  /**
   * Must be no longer than 1000 characters otherwise OpenAI rejects it
   */
  public getQuerySchemaString(): string {
    return `
{
   "_id": {},
    "name": {},
    "status": {"enum": ["confirmed", "tentative", "cancelled"]},
    "description": {},
    "calendarId": {"description": "Parent calendar ID"},
    "uri": {"title": "Calendar link"},
    "location": {"title": "Event location"},
    "start": {"$ref": "#/$defs/time"},
    "end": {"$ref": "#/$defs/time"},
    "conferenceData": {"type": "object"},
    "sourceApplication": {"title": "Application this data is sourced"},
    "$defs": {"person": {"type": "object","title": "Person","properties": {"email": {},"displayName": {}}}}
}
`;
  }
}

export default new CalendarEventDataSchema();
