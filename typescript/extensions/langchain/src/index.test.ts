import { z } from "zod";
import { getLangChainTools } from "./index";
import { PersonalAgentKit, Action } from "@verida/personalagentkit";

// Mocking the Action class
const mockAction: Action = {
  name: "testAction",
  description: "A test action",
  schema: z.object({ test: z.string() }),
  invoke: jest.fn(async arg => `Invoked with ${arg.test}`),
};

// Creating a mock for PersonalAgentKit
jest.mock("@verida/personalagentkit", () => {
  const originalModule = jest.requireActual("@verida/personalagentkit");
  return {
    ...originalModule,
    PersonalAgentKit: {
      from: jest.fn().mockImplementation(() => ({
        getActions: jest.fn(() => [mockAction]),
      })),
    },
  };
});

describe("getLangChainTools", () => {
  it("should return an array of tools with correct properties", async () => {
    const mockAgentKit = await PersonalAgentKit.from({
      veridaApiKey: ""
    });
    const tools = await getLangChainTools(mockAgentKit);

    expect(tools).toHaveLength(1);
    const tool = tools[0];

    expect(tool.name).toBe(mockAction.name);
    expect(tool.description).toBe(mockAction.description);
    expect(tool.schema).toBe(mockAction.schema);

    const result = await tool.invoke({ test: "data" });
    expect(result).toBe("Invoked with data");
  });
});
