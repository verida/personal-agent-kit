import { z } from "zod";
import { KeywordSearchSchema } from "../interfaces";
import axios from "axios";
import { BaseAction } from "./base";

/**
 *
 */
export class ChatSearchAction extends BaseAction {
  public name = "search_chat_threads";
  public description = "This tool enables searching of chat threads by keywords.";
  public schema = KeywordSearchSchema;

  /**
   * Invoke this action
   *
   * @param args - Action arguments
   * @returns Action result
   */
  public async _invoke(args: z.infer<typeof KeywordSearchSchema>): Promise<string> {
    const response = await axios({
      method: "GET",
      url: `https://api.verida.ai/api/rest/v1/search/chatThreads?keywords=${args.keywords}&limit=${args.limit ? args.limit : 20}&skip=${args.skip ? args.skip : 0}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authToken}`,
      },
    });

    return JSON.stringify(response.data);
  }
}
