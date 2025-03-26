# Verida PersonalAgentKit LangChain Extension Examples - Chatbot Typescript

This example demonstrates an agent setup as a terminal style chatbot with access to the full set of Verida PersonalAgentKit actions.

## Ask the chatbot to access your data

- Summarize my last 24 hours of emails
- Create a meeting agenda and status update for my meeting today with Dustin Johnson, review the "DJ + PGA" TG group and my emails for anything relevant.
- Create a markdown table of all the emails I have received with unsubscribe links, provide a link to quickly unsubscribe
- How much have I spent on utility bills in the last 12 months?

## Prerequisites

### Checking Node Version

Before using the example, ensure that you have the correct version of Node.js installed. The example requires Node.js 20 or higher. You can check your Node version by running:

```bash
node --version
```

If you don't have the correct version, you can install it using [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install node
```

This will automatically install and use the latest version of Node.

### API Keys

#### Verida API Key

You will need to obtain a Verida AI API key] for accessing user data.

See [Get a VERIDA API key](https://docs.verida.ai/getting-started/get-an-api-key)
 from the Verida documentation.

You will also need to configure a LLM to use. See [Which LLM to use]](https://docs.verida.ai/overview/langgraph#which-llm-to-use) from the Verida documentation on some good options.


Once you have them, rename the `.env-local` file to `.env` and make sure you set the API keys to their corresponding environment variables:

- "VERIDA_API_KEY" &mdash; API Auth Token obtained from the user
- "OPENAI_API_KEY" &mdash; API Key obtained from OpenAI or another OpenAI compatible service

You can also configure additional optional configuration parameters:

- "OPENAI_MODEL" &mdash; ie: 
- "OPENAI_BASE_URL"
- "DEBUG" &mdash; OpenAI request / response output
- "VERIDA_DEBUG" &mdash; Verida AI tool calling output

## Running the example

From the root directory, run:

```bash
yarn install
yarn run build
```

This will install the dependencies and build the packages locally. The chatbot example uses the local `@verida/personalagentkit-langchain` and `@verida/personalagentkit` packages. If you make changes to the packages, you can run `yarn run build` from root again to rebuild the packages, and your changes will be reflected in the chatbot example.

Now from the `typescript/examples/chatbot` directory, run:

```bash
yarn run dev
```

Select "1. chat mode" and start talking to your data!

## License

Apache-2.0
