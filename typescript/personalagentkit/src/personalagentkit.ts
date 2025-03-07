import { Action, PersonalAgentKitOptions } from "./interfaces";

/**
 *
 */
export class PersonalAgentKit {
  private apiKey: string;

  /**
   * Create Personal Agent
   *
   * @param options - Options
   */
  constructor(options: PersonalAgentKitOptions) {
    this.apiKey = options.veridaApiKey;
  }

  /**
   * Get all supported actions
   *
   * @returns Array of actions
   */
  public getActions(): Action[] {
    const actions: Action[] = [];
    return actions;
  }
}
