import { BackboardClient } from "backboard-sdk";

let client = null;
let assistantId = null;

function getClient() {
  if (!client) {
    if (!process.env.BACKBOARD_API_KEY) {
      throw new Error("BACKBOARD_API_KEY not found in environment");
    }

    client = new BackboardClient({
      apiKey: process.env.BACKBOARD_API_KEY
    });
  }

  return client;
}

async function initAssistant() {
  if (assistantId) return assistantId;

  const client = getClient();

  const assistant = await client.createAssistant({
    name: "RetroStockNarrator",
    system_prompt: `
    You are a professional financial advisor providing a concise monthly market summary and decision analysis.
    Keep responses to three short sections.
    1. **Market Update**: State the current date, portfolio value, monthly return, and major events.
    2. **Decision Analysis**: Review the 'Trades this month' provided in the data. Explain if the trade was logical given the current market event.
    3. **Outlook**: Provide a brief professional outlook based on the data.
    Do not use dramatic language or metaphors. Be direct.
    `
  });

  assistantId = assistant.assistantId;
  return assistantId;
}

export async function createThread() {
  const client = getClient();
  const id = await initAssistant();
  const thread = await client.createThread(id);
  return thread.threadId;
}

export async function sendNarration(threadId, content) {
  const client = getClient();

  const response = await client.addMessage(threadId, {
    content,
    stream: false
  });

  return response.content;
}