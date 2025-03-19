# Verida personalAgentKit LangChain Extension Examples - Chatbot Typescript

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

You will need to obtain a [Verida AI API key]() for accessing user data. You need to:

1. [Register a Verida developer account](https://docs.verida.ai/getting-started/developer-console) &mdash; so you can obtain API keys for a user account
2. [Create a Verida Vault account](https://docs.verida.ai/resources/verida-vault) &mdash; so you can securely extract your data from web2
3. [Obtain your user API key](https://admin.verida.ai/) &mdash; Login to the Developer Console and use the Developer Sandbox to build a user request to obtain an API key


You will also need to obtain an [OpenAI API Key](https://platform.openai.com/docs/quickstart#create-and-export-an-api-key) for LLM access. It is possible to use an alternative OpenAI compatible API; for example [RedPill AI](https://red-pill.ai/) which runs in a Trusted Execution Environment for maximum privacy.

Once you have them, rename the `.env-local` file to `.env` and make sure you set the API keys to their corresponding environment variables:

- "VERIDA_API_KEY" &mdash; API Auth Token obtained from the user
- "OPENAI_API_KEY" &mdash; API Key obtained from OpenAI

You can also configure additional optional configuration parameters:

- "OPENAI_MODEL"
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
