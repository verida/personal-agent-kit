import { z } from "zod";
import { SCHEMAS } from "./schemas";

const SCHEMA_NAMES = Object.keys(SCHEMAS) as [string, ...string[]];

export interface PersonalAgentKitOptions {
  veridaApiKey: string;
  veridaApiEndpoint?: string;
}

export interface Action<TActionSchema extends z.ZodSchema = z.ZodSchema> {
  name: string;
  description: string;
  schema: TActionSchema;
  invoke: (args: z.infer<TActionSchema>) => Promise<string>;
}

export const CouchDBQuerySchema = z.object({
  selector: z.record(z.string(), z.any()).optional().describe(`Couchdb selector object`),
  fields: z.array(z.string()).optional().describe(`Array of fields to include in the result`),
  sort: z
    .array(
      z.record(z.string(), z.enum(["asc", "desc"])).describe(`Example: [{ "sentAt": "desc" }]`),
    )
    .optional(),
  limit: z.number().optional().describe(`Maximum number of documents to return`),
  skip: z.number().optional().describe(`Number of documents to skip`),
  count: z
    .boolean()
    .optional()
    .describe(`If true, a count of the number of matching results will be returned`),
});

export type CouchDBQuerySchemaType = z.infer<typeof CouchDBQuerySchema>;

export const EmptySchema = z.object({});
export type EmptySchemaType = z.infer<typeof EmptySchema>;

export const ProfileSchema = z.object({
  providerId: z.string().optional().describe(`Connection name, ie: google, telegram, discord`),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;

export const KeywordSearchSchema = z.object({
  keywords: z.string().describe(`Keywords to search`),
  limit: z.number().optional().describe(`Maximum number of documents to return`),
  skip: z.number().optional().describe(`Number of documents to skip`),
});

export type KeywordSearchSchemaType = z.infer<typeof KeywordSearchSchema>;

export const DatastoreSearchSchema = z.object({
  keywords: z.string().describe(`Keywords to search`),
  dataType: z.enum(SCHEMA_NAMES).describe(`Type of data to search`),
  limit: z.number().optional().describe(`Maximum number of documents to return`),
  skip: z.number().optional().describe(`Number of documents to skip`),
});

export type DatastoreSearchSchemaType = z.infer<typeof DatastoreSearchSchema>;

export const DatastoreGetRecordSchema = z.object({
  dataType: z.enum(SCHEMA_NAMES).describe(`Type of data to search`),
  recordId: z.string().describe(`Unique ID of the record to fetch`)
});

export type DatastoreGetRecordSchemaType = z.infer<typeof DatastoreGetRecordSchema>;
