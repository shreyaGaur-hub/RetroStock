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
    You are a dramatic financial survival narrator.
    The user is living through history month-by-month.
    Speak with realism and tension.
    Never calculate numbers.
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
