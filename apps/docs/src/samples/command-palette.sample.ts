import type { Sample } from "./types"

const sample: Sample = {
  id: "command-palette",
  kind: "block",
  title: "Command palette",
  description: "Search-first action launcher — Input header, suggestion rows with keyboard hint chips. Static markup; wire your own keyboard handler.",
  componentName: "CommandPalette",
  category: "Productivity",
  order: 2,
  featured: true,
  registryDependencies: ["card", "stack", "badge", "input"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: { className: "max-w-md" }, children: ["content"] },
      content: { type: "CardContent", props: { className: "py-3" }, children: ["stack"] },
      stack: { type: "Stack", props: { direction: "col", gap: "3" }, children: ["search", "list"] },
      search: { type: "Input", props: { type: "search", placeholder: "Type a command or search…" }, children: [] },
      list: { type: "Stack", props: { direction: "col", gap: "1" }, children: ["a1", "a2", "a3", "a4"] },
      a1: { type: "Stack", props: { direction: "row", gap: "3", align: "center", className: "py-1.5" }, children: ["a1l", "a1k"] },
      a1l: { type: "Text", props: { content: "New ticket", size: "sm", className: "flex-1" }, children: [] },
      a1k: { type: "Badge", props: { text: "⌘ N", variant: "secondary", className: "font-mono" }, children: [] },
      a2: { type: "Stack", props: { direction: "row", gap: "3", align: "center", className: "py-1.5" }, children: ["a2l", "a2k"] },
      a2l: { type: "Text", props: { content: "Switch project…", size: "sm", className: "flex-1" }, children: [] },
      a2k: { type: "Badge", props: { text: "⌘ P", variant: "secondary", className: "font-mono" }, children: [] },
      a3: { type: "Stack", props: { direction: "row", gap: "3", align: "center", className: "py-1.5" }, children: ["a3l", "a3k"] },
      a3l: { type: "Text", props: { content: "Open settings", size: "sm", className: "flex-1" }, children: [] },
      a3k: { type: "Badge", props: { text: "⌘ ,", variant: "secondary", className: "font-mono" }, children: [] },
      a4: { type: "Stack", props: { direction: "row", gap: "3", align: "center", className: "py-1.5" }, children: ["a4l", "a4k"] },
      a4l: { type: "Text", props: { content: "Sign out", size: "sm", muted: true, className: "flex-1" }, children: [] },
      a4k: { type: "Badge", props: { text: "⌘ ⇧ Q", variant: "outline", className: "font-mono" }, children: [] },
    },
  },
}

export default sample
