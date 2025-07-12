import Sandbox from "@e2b/code-interpreter";

export async function getSandbox(id: string){
  const sandbox = await Sandbox.connect(id, {
    apiKey: process.env.E2B_API_KEY,
  });
  return sandbox;
}