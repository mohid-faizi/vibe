"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [text, setText] = useState("");
  const trpc = useTRPC();
  const invoke = useMutation(trpc.haveChat.mutationOptions());

  const handleGenerate = () => {
    if (text.trim()) {
      invoke.mutate({ text: text.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Text Generator</CardTitle>
          <CardDescription>
            Enter your text and click generate to process it
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={!text.trim() || invoke.isPending}
            className="w-full"
          >
            {invoke.isPending ? "Generating..." : "Generate"}
          </Button>
          {invoke.isError && (
            <p className="text-sm text-red-600">
              Error: {invoke.error?.message || "Something went wrong"}
            </p>
          )}
          {invoke.isSuccess && (
            <p className="text-sm text-green-600">
              Successfully generated!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
