import type { Sample } from "./types"

const sample: Sample = {
  id: "ticket-card",
  kind: "block",
  title: "Ticket card",
  description: "Card with priority badge, tag chips, and a primary action — for surfacing a single issue.",
  componentName: "TicketCard",
  category: "Cards",
  order: 1,
  featured: true,
  registryDependencies: ["card", "badge", "button"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["hdr", "content", "footer"] },
      hdr: { type: "CardHeader", props: {}, children: ["title", "desc"] },
      title: { type: "CardTitle", props: { text: "Ticket: Payment retry loop" }, children: [] },
      desc: { type: "CardDescription", props: { text: "Flashing back to idle between paying and loading." }, children: [] },
      content: { type: "CardContent", props: {}, children: ["badges"] },
      badges: { type: "Stack", props: { direction: "row", gap: "1", wrap: true }, children: ["b-pri", "b-tag1", "b-tag2"] },
      "b-pri": { type: "Badge", props: { text: "P0", variant: "destructive" }, children: [] },
      "b-tag1": { type: "Badge", props: { text: "#billing", variant: "secondary" }, children: [] },
      "b-tag2": { type: "Badge", props: { text: "#fetcher", variant: "secondary" }, children: [] },
      footer: { type: "CardFooter", props: {}, children: ["btn"] },
      btn: { type: "Button", props: { label: "Open", variant: "outline", size: "sm" }, children: [] },
    },
  },
}

export default sample
