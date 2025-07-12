import { inngest } from "@/inngest/client";
import { createAgent, openai } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "@/lib/e2b";

export const haveChat = inngest.createFunction(
  { id: "have-chat" },
  { event: "test/have.chat" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async()=>{
      const sandbox = await Sandbox.create("next-app-template", {
        apiKey: process.env.E2B_API_KEY,
      });
      return sandbox.sandboxId;
    })

    const summarizer = createAgent({
      name: "Summarizer",
      description: "Summarize the conversation",
      system: 'You are a Next.js expert that helps with Next.js questions. Or if the user want to generate any Next.js code, you can generate the code using the latest Next.js version and latest libraries like shadcn/ui, tailwindcss, etc.',
      model: openai({
        model: 'gpt-4o-mini',
      }),
    })

    const sandboxUrl = await step.run("get-sandbox-url", async()=>{
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `http://${host}`;
    })

    const response = await summarizer.run(event.data.text);
    return { output: response, sandboxUrl };
  },
)