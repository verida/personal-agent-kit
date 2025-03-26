# Verida PersonalAgentkit

PersonalAgentKit is a framework for easily enabling AI agents to access private user data. It is designed to be framework-agnostic.

## Table of Contents

- [Verida PersonalAgentkit](#verida-personalagentkit)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Create a PersonalAgentKit instance.](#create-a-personalagentkit-instance)
    - [Use the agent's actions with a framework extension. For example, using LangChain + OpenAI.](#use-the-agents-actions-with-a-framework-extension-for-example-using-langchain--openai)
    - [Make a LLM request with access to user data](#make-a-llm-request-with-access-to-user-data)

## Getting Started

*Prerequisites*:
- [Node.js 20+](https://nodejs.org/en/download/)
- [Verida API key](https://docs.verida.ai/getting-started/get-an-api-key)
- [Open AI Compatible API Key](https://docs.verida.ai/integrations/langgraph#which-llm-to-use)

## Installation

```bash
yarn install @verida/personalagentkit
```

## Usage

### Create a PersonalAgentKit instance.

*Cnfiguration*:

- Set `VERIDA_API_KEY` environment variable [REQUIRED]
- Set `VERIDA_API_ENDPOINT` environment variable [OPTIONAL]

```typescript
  import { PersonalAgentKit, PersonalAgentKitOptions } from "@verida/personalagentkit";
  import { getLangChainTools } from "@verida/personalagentkit-langchain";

  // Initialize AgentKit
  const personalAgentkit = await PersonalAgentKit.from(<PersonalAgentKitOptions>{
    veridaApiKey: process.env.VERIDA_API_KEY,
    veridaApiEndpoint: process.env.VERIDA_API_ENDPOINT || undefined,
  });

  const tools = await getLangChainTools(personalAgentkit);
```

### Use the agent's actions with a framework extension. For example, using LangChain + OpenAI.

*Configuration*:

- Set `OPENAI_API_KEY` environment variable to your LLM API Key [REQUIRED]
- Set `OPENAI_MODEL` environment variable [OPTIONAL]
- Set `OPENAI_BASE_URL` environment variable [OPTIONAL]

```bash
yarn install @langchain @langchain/langgraph @langchain/openai
```

```typescript
  import { ChatOpenAI } from "@langchain/openai";
  import { MemorySaver } from "@langchain/langgraph";
  import { createReactAgent } from "@langchain/langgraph/prebuilt";

  // Initialize LLM
  const llm = new ChatOpenAI({
    model: process.env.OPENAI_MODEL ? process.env.OPENAI_MODEL : undefined,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
      baseURL: process.env.OPENAI_BASE_URL ? process.env.OPENAI_BASE_URL : undefined,
    },
  });

  // Store buffered conversation history in memory
  const memory = new MemorySaver();
  const agentConfig = {
    configurable: { thread_id: "PersonalAgentKit Chatbot Example" },
  };

  // Create React Agent using the LLM and Verida PersonalAgentKit tools
  const agent = createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
    messageModifier: `
        You are a helpful agent that has access to the user's data via the Verida PersonalAgentKit. You are empowered to query user data to provide personalized responses and learn more about the user. If someone asks you to do something you can't do with your currently available tools, you must say so. Be concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.
        `,
  });
```

### Make a LLM request with access to user data

```typescript
  import { HumanMessage } from "@langchain/core/messages";
  
  const userInput = "Summarize and prioritize my last 24 hours of messages"
  const stream = await agent.stream({ messages: [new HumanMessage(userInput)] }, agentConfig);

  for await (const chunk of stream) {
    if ("agent" in chunk) {
      console.log(chunk.agent.messages[0].content);
    }
  }
```
