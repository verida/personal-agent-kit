import { Action, EmptySchema, EmptySchemaType } from "@verida/personalagentkit";
import z from "zod";

/**
 *
 */
export class BaseAction<TActionSchema extends z.ZodSchema = z.ZodSchema> implements Action {
  public name = "";
  public description = "";
  public schema = EmptySchema;

  protected authToken: string;
  protected apiEndpoint: string;

  /**
   *
   * @param authToken
   * @param apiEndpoint
   */
  constructor(authToken: string, apiEndpoint: string) {
    this.authToken = authToken;
    this.apiEndpoint = apiEndpoint;
  }

  /**
   *
   * @param args
   */
  public async invoke(args: z.infer<TActionSchema>): Promise<string> {
    const DEBUG = process.env.VERIDA_DEBUG === "true";

    if (DEBUG) {
      console.log(`Verida:DEBUG:invoke:${this.name}\n${JSON.stringify(args, null, 2)}\n`);
    }

    try {
      const result = await this._invoke(args);

    //   if (DEBUG) {
    //     console.log(`Verida:DEBUG:invoke-result:${this.name}\n${result}\n`);
    //   }

      return result;
    } catch (err: unknown) {
      const error = err as Error;
      if (DEBUG) {
        console.log(`Verida:DEBUG:invoke-error:${error.message}\n`);
      }

      throw err;
    }
  }

  /**
   *
   * @param args
   */
  protected async _invoke(args: z.infer<TActionSchema>): Promise<string> {
    throw new Error(`_invoke() not implemented`);
  }
}
