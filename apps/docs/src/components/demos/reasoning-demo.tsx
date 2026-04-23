"use client";

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";

const SAMPLE = `The user asked a factual question. Let me work through it.

1. First, identify the core claim.
2. Cross-reference against the source material.
3. Summarize concisely.

I'll respond with a two-sentence answer.`;

export function ReasoningDemo() {
  return (
    <Reasoning defaultOpen>
      <ReasoningTrigger />
      <ReasoningContent>{SAMPLE}</ReasoningContent>
    </Reasoning>
  );
}
