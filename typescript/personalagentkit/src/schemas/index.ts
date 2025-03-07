import { BaseDataSchema } from "./base";
import calendarEvent from "./calendarEvent";
import chatGroup from "./chatGroup";
import email from "./email";
import file from "./file";
import following from "./following";
import post from "./post";
import favourite from "./favourite";
import chatMessage from "./chatMessage";

/**
 * Get an array of data schemas
 *
 * @param limitSchemas - Restrict schemas to return
 * @returns Array of schema objects
 */
export function getDataSchemas(limitSchemas?: string[]): BaseDataSchema[] {
  const schemaDefs = [
    calendarEvent,
    chatGroup,
    chatMessage,
    email,
    file,
    following,
    post,
    favourite,
  ];
  if (limitSchemas) {
    const finalSchemas: BaseDataSchema[] = [];
    for (const schemaDef of schemaDefs) {
      if (limitSchemas.indexOf(schemaDef.getUrl()) !== -1) {
        finalSchemas.push(schemaDef);
      }
    }

    return finalSchemas;
  } else {
    return schemaDefs;
  }
}

/**
 * Get data schemas as a dict
 *
 * @param limitSchemas - Restrit schemas to return
 * @returns Dictionary of schema objects
 */
export function getDataSchemasDict(limitSchemas?: string[]) {
  const schemas = getDataSchemas(limitSchemas);
  const dataSchemaDict: Record<string, BaseDataSchema> = schemas.reduce((obj, item) => {
    obj[item.getUrl()] = item;
    return obj;
  }, {});

  return dataSchemaDict;
}
