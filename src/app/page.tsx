"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";


export default function Home() {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.inngest.mutationOptions());

  return (
    <>
      <div>
        <button onClick={() => invoke.mutate({ text: "world" })}>Invoke</button>
      </div>
    </>
  );
}
