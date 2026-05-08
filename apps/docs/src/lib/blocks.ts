import type { Spec } from "@/lib/spec-to-code";

export interface BlockDef {
  /** kebab-case name used in URLs, registry, filenames */
  id: string;
  /** PascalCase component name used in generated React code */
  componentName: string;
  title: string;
  description: string;
  registryDependencies: string[];
  spec: Spec;
}

export const TICKET_CARD: BlockDef = {
  id: "ticket-card",
  componentName: "TicketCard",
  title: "Ticket card",
  description:
    "Card with priority badge, tag chips, and a primary action — for surfacing a single issue.",
  registryDependencies: ["card", "badge", "button"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["hdr", "content", "footer"] },
      hdr: { type: "CardHeader", props: {}, children: ["title", "desc"] },
      title: { type: "CardTitle", props: { text: "Ticket: Payment retry loop" }, children: [] },
      desc: {
        type: "CardDescription",
        props: { text: "Flashing back to idle between paying and loading." },
        children: [],
      },
      content: { type: "CardContent", props: {}, children: ["badges"] },
      badges: {
        type: "Stack",
        props: { direction: "row", gap: "1", wrap: true },
        children: ["b-pri", "b-tag1", "b-tag2"],
      },
      "b-pri": { type: "Badge", props: { text: "P0", variant: "destructive" }, children: [] },
      "b-tag1": { type: "Badge", props: { text: "#billing", variant: "secondary" }, children: [] },
      "b-tag2": { type: "Badge", props: { text: "#fetcher", variant: "secondary" }, children: [] },
      footer: { type: "CardFooter", props: {}, children: ["btn"] },
      btn: { type: "Button", props: { label: "Open", variant: "outline", size: "sm" }, children: [] },
    },
  },
};

export const STATS_CARD: BlockDef = {
  id: "stats-card",
  componentName: "StatsCard",
  title: "Stats card",
  description:
    "Card with a stack of label · value rows — for dashboards and recap surfaces.",
  registryDependencies: ["card"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["hdr", "content"] },
      hdr: { type: "CardHeader", props: {}, children: ["title", "desc"] },
      title: { type: "CardTitle", props: { text: "Weekly transitions" }, children: [] },
      desc: {
        type: "CardDescription",
        props: { text: "Past 7 days across all machines." },
        children: [],
      },
      content: { type: "CardContent", props: {}, children: ["stack"] },
      stack: {
        type: "Stack",
        props: { direction: "col", gap: "2" },
        children: ["s1", "s2", "s3"],
      },
      s1: { type: "Text", props: { content: "Transitions · 1,284 (+12%)", size: "sm" }, children: [] },
      s2: {
        type: "Text",
        props: { content: "Avg latency · 142ms (−6%)", size: "sm", muted: true },
        children: [],
      },
      s3: {
        type: "Text",
        props: { content: "Error rate · 0.3% (+0.1%)", size: "sm", muted: true },
        children: [],
      },
    },
  },
};

export const UPGRADE_CARD: BlockDef = {
  id: "upgrade-card",
  componentName: "UpgradeCard",
  title: "Upgrade card",
  description:
    "Card with body copy and a footer CTA — for plan upgrades and conversion prompts.",
  registryDependencies: ["card", "button"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["hdr", "content", "footer"] },
      hdr: { type: "CardHeader", props: {}, children: ["title", "desc"] },
      title: { type: "CardTitle", props: { text: "Upgrade your plan" }, children: [] },
      desc: {
        type: "CardDescription",
        props: { text: "Unlock more projects and seats." },
        children: [],
      },
      content: { type: "CardContent", props: {}, children: ["body"] },
      body: {
        type: "Text",
        props: { content: "$19/month, cancel anytime.", size: "sm", muted: true },
        children: [],
      },
      footer: { type: "CardFooter", props: {}, children: ["btn"] },
      btn: { type: "Button", props: { label: "Upgrade" }, children: [] },
    },
  },
};

export const BLOCKS: BlockDef[] = [TICKET_CARD, STATS_CARD, UPGRADE_CARD];
