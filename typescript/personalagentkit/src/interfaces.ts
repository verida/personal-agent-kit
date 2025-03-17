import { z } from "zod";

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
