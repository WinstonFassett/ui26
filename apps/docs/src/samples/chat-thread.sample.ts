import type { Sample } from "./types"

const sample: Sample = {
  id: "chat-thread",
  kind: "block",
  title: "Chat thread",
  description: "Two-turn AI conversation with user bubble (muted bg) and bare AI reply. Avatar, timestamp, and a composed input footer with mode pills.",
  componentName: "ChatThread",
  category: "AI",
  order: 2,
  featured: true,
  span: "full",
  registryDependencies: ["card", "stack", "avatar", "badge", "button", "textarea", "separator"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: { className: "max-w-2xl" }, children: ["content", "sep", "footer"] },
      content: { type: "CardContent", props: { className: "py-6" }, children: ["thread"] },
      thread: { type: "Stack", props: { direction: "col", gap: "6" }, children: ["m1", "m2", "m3", "m4"] },

      // user turn 1
      m1: { type: "Stack", props: { direction: "row", gap: "3", align: "start", className: "justify-end" }, children: ["m1-body", "m1-av"] },
      "m1-body": { type: "Stack", props: { direction: "col", gap: "1", className: "max-w-[75%]" }, children: ["m1-bubble", "m1-time"] },
      "m1-bubble": { type: "Stack", props: { direction: "col", gap: "0", className: "rounded-2xl px-4 py-3 bg-muted" }, children: ["m1-text"] },
      "m1-text": { type: "Text", props: { content: "Why is the checkout test flaky on Mondays only?", size: "sm" }, children: [] },
      "m1-time": { type: "Text", props: { content: "2:14 pm", size: "xs", mono: true, className: "text-right text-muted-foreground" }, children: [] },
      "m1-av": { type: "Avatar", props: { size: "sm", className: "shrink-0 mt-0.5" }, children: ["m1-fb"] },
      "m1-fb": { type: "AvatarFallback", props: { text: "WF", className: "text-[10px]" }, children: [] },

      // ai turn 1
      m2: { type: "Stack", props: { direction: "row", gap: "3", align: "start" }, children: ["m2-av", "m2-body"] },
      "m2-av": { type: "Avatar", props: { size: "sm", className: "shrink-0 mt-0.5 bg-muted" }, children: ["m2-fb"] },
      "m2-fb": { type: "AvatarFallback", props: { text: "✦", className: "text-[11px]" }, children: [] },
      "m2-body": { type: "Stack", props: { direction: "col", gap: "1", className: "max-w-[75%]" }, children: ["m2-text", "m2-foot"] },
      "m2-text": { type: "Text", props: { content: "Likely a weekend cron that recycles staging Stripe keys. The first Monday run sees stale keys until the seed job catches up. Run pnpm seed:stripe before the test suite, or move the cron to Sundays.", size: "sm", className: "leading-relaxed" }, children: [] },
      "m2-foot": { type: "Stack", props: { direction: "row", gap: "2", align: "center" }, children: ["m2-badge", "m2-time"] },
      "m2-badge": { type: "Badge", props: { text: "3 sources", variant: "secondary" }, children: [] },
      "m2-time": { type: "Text", props: { content: "2:14 pm", size: "xs", mono: true, muted: true }, children: [] },

      // user turn 2
      m3: { type: "Stack", props: { direction: "row", gap: "3", align: "start", className: "justify-end" }, children: ["m3-body", "m3-av"] },
      "m3-body": { type: "Stack", props: { direction: "col", gap: "1", className: "max-w-[75%]" }, children: ["m3-bubble", "m3-time"] },
      "m3-bubble": { type: "Stack", props: { direction: "col", gap: "0", className: "rounded-2xl px-4 py-3 bg-muted" }, children: ["m3-text"] },
      "m3-text": { type: "Text", props: { content: "How do I move the cron to Sundays without breaking the pipeline?", size: "sm" }, children: [] },
      "m3-time": { type: "Text", props: { content: "2:15 pm", size: "xs", mono: true, className: "text-right text-muted-foreground" }, children: [] },
      "m3-av": { type: "Avatar", props: { size: "sm", className: "shrink-0 mt-0.5" }, children: ["m3-fb"] },
      "m3-fb": { type: "AvatarFallback", props: { text: "WF", className: "text-[10px]" }, children: [] },

      // ai turn 2
      m4: { type: "Stack", props: { direction: "row", gap: "3", align: "start" }, children: ["m4-av", "m4-body"] },
      "m4-av": { type: "Avatar", props: { size: "sm", className: "shrink-0 mt-0.5 bg-muted" }, children: ["m4-fb"] },
      "m4-fb": { type: "AvatarFallback", props: { text: "✦", className: "text-[11px]" }, children: [] },
      "m4-body": { type: "Stack", props: { direction: "col", gap: "1", className: "max-w-[75%]" }, children: ["m4-text", "m4-time"] },
      "m4-text": { type: "Text", props: { content: "Edit .github/workflows/seed.yml and change the cron from 0 2 * * 1 (Monday) to 0 2 * * 0 (Sunday). Then trigger a manual run once to confirm the keys are fresh before Monday CI starts.", size: "sm", className: "leading-relaxed" }, children: [] },
      "m4-time": { type: "Text", props: { content: "2:15 pm", size: "xs", mono: true, muted: true }, children: [] },

      sep: { type: "Separator", props: {}, children: [] },

      // input footer
      footer: { type: "CardFooter", props: { className: "flex-col gap-2 px-4 py-3" }, children: ["modes", "input-row"] },
      modes: { type: "Stack", props: { direction: "row", gap: "1", wrap: true, className: "justify-center" }, children: ["p-fast", "p-deep", "p-think"] },
      "p-fast": { type: "Button", props: { label: "⚡ Fast", variant: "secondary", size: "sm", className: "h-7 px-3 text-xs" }, children: [] },
      "p-deep": { type: "Button", props: { label: "◎ Deep Search", variant: "ghost", size: "sm", className: "h-7 px-3 text-xs" }, children: [] },
      "p-think": { type: "Button", props: { label: "✦ Think", variant: "ghost", size: "sm", className: "h-7 px-3 text-xs" }, children: [] },
      "input-row": { type: "Stack", props: { direction: "row", gap: "2", align: "end", className: "w-full" }, children: ["ta", "send"] },
      ta: { type: "Textarea", props: { placeholder: "Continue the conversation…", rows: 2, className: "flex-1 resize-none text-sm" }, children: [] },
      send: { type: "Button", props: { label: "Send", size: "sm", className: "h-9 px-4 shrink-0" }, children: [] },
    },
  },
}

export default sample
