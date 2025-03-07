import { z } from "zod";

export interface PersonalAgentKitOptions {
  veridaApiKey: string;
}

export interface Action<TActionSchema extends z.ZodSchema = z.ZodSchema> {
  name: string;
  description: string;
  schema: TActionSchema;
  invoke: (args: z.infer<TActionSchema>) => Promise<string>;
}
