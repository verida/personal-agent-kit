import { getActions } from "./actions";
import { Action, PersonalAgentKitOptions } from "./interfaces";

/**
 *
 */
export class PersonalAgentKit {
  private apiKey: string;
  private apiEndpoint: string = "https://api.verida.ai";

  /**
   * Create Personal Agent
   *
   * @param options - Options
   */
  private constructor(options: PersonalAgentKitOptions) {
    this.apiKey = options.veridaApiKey;
    if (options.veridaApiEndpoint) {
      this.apiEndpoint = options.veridaApiEndpoint;
    }
  }

  /**
   *
   * @param options
   */
  public static async from(options: PersonalAgentKitOptions) {
    return new PersonalAgentKit(options);
  }

  /**
   * Get all supported actions
   *
   * @returns Array of actions
   */
  public getActions(): Action[] {
    const actions = getActions(this.apiKey, this.apiEndpoint);
    return actions;
  }
}
