import type { Sample } from "./types"

const sample: Sample = {
  id: "ai-message",
  kind: "block",
  title: "AI message thread",
  description: "Card showing one user/assistant exchange — role eyebrow, message body, and a quiet provenance footer. For chat surfaces and inline copilots.",
  componentName: "AiMessage",
  category: "AI",
  order: 1,
  featured: true,
  registryDependencies: ["card", "stack", "badge"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: { className: "max-w-lg" }, children: ["content", "footer"] },
      content: { type: "CardContent", props: { className: "py-5" }, children: ["stack"] },
      stack: { type: "Stack", props: { direction: "col", gap: "5" }, children: ["u-stack", "a-stack"] },
      "u-stack": { type: "Stack", props: { direction: "col", gap: "1.5" }, children: ["u-eb", "u-body"] },
      "u-eb": { type: "Text", props: { content: "you · 2:14pm", size: "xs", mono: true, className: "uppercase tracking-wider text-muted-foreground" }, children: [] },
      "u-body": { type: "Text", props: { content: "Why is the checkout test flaky on Mondays only?", size: "sm" }, children: [] },
      "a-stack": { type: "Stack", props: { direction: "col", gap: "1.5" }, children: ["a-eb", "a-body"] },
      "a-eb": { type: "Text", props: { content: "claude · synthesised", size: "xs", mono: true, className: "uppercase tracking-wider text-accent" }, children: [] },
      "a-body": { type: "Text", props: { content: "Likely a weekend cron that recycles staging Stripe keys. The first Monday run sees stale keys until the seed job catches up. Run `pnpm seed:stripe` before the test or move the cron to Sundays.", size: "sm", className: "leading-relaxed" }, children: [] },
      footer: { type: "CardFooter", props: { className: "border-t border-border" }, children: ["foot"] },
      foot: { type: "Stack", props: { direction: "row", gap: "2", align: "center" }, children: ["fb1", "fb2"] },
      fb1: { type: "Badge", props: { text: "3 sources", variant: "secondary" }, children: [] },
      fb2: { type: "Badge", props: { text: "model: opus-4.7", variant: "outline", className: "font-mono" }, children: [] },
    },
  },
}

export default sample
