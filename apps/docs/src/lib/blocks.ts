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

// Eight type-scale rows. Each row is (label · sample · metric).
// Tailwind named scale only — no arbitrary px.
type SampleSpec =
  | { kind: "heading"; level: "h1" | "h2" | "h3" | "h4"; className?: string }
  | { kind: "text"; size?: "xs" | "sm" | "base" | "lg" | "xl"; muted?: boolean; mono?: boolean; className?: string };

const TS_ROWS: Array<{ tag: string; sample: string; metric: string; spec: SampleSpec }> = [
  { tag: "display/xl", sample: "Composable state.",                                                                                                      metric: "60/500", spec: { kind: "heading", level: "h1", className: "font-serif italic font-medium text-6xl tracking-tight" } },
  { tag: "display/lg", sample: "State, without ceremony.",                                                                                               metric: "48/500", spec: { kind: "heading", level: "h1", className: "font-serif font-medium text-5xl tracking-tight" } },
  { tag: "h1",         sample: "Ticket: Payment retry loop",                                                                                             metric: "30/600", spec: { kind: "heading", level: "h1" } },
  { tag: "h2",         sample: "Transitions, guarded",                                                                                                   metric: "24/600", spec: { kind: "heading", level: "h2" } },
  { tag: "body",       sample: "Matchina handles state transitions, effects, and pattern matching — end-to-end typed.",                                  metric: "14/400", spec: { kind: "text", size: "sm", className: "leading-relaxed" } },
  { tag: "caption",    sample: "Last edited 3 hours ago by kai.",                                                                                        metric: "12/400", spec: { kind: "text", size: "xs", muted: true } },
  { tag: "mono/sm",    sample: "v0.4.0 · 2kb gzipped · 0 dependencies",                                                                                  metric: "12/400", spec: { kind: "text", size: "xs", mono: true } },
  { tag: "eyebrow",    sample: "now · shipping · api reference",                                                                                         metric: "10/500", spec: { kind: "text", mono: true, className: "text-2xs uppercase tracking-wider text-muted-foreground" } },
];

const TS_GRID_CHILDREN: string[] = [];
const TS_ELEMENTS: Record<string, { type: string; props: Record<string, unknown>; children: string[] }> = {};
for (let i = 0; i < TS_ROWS.length; i++) {
  const row = TS_ROWS[i];
  const tagId = `t${i}`, sampleId = `s${i}`, metricId = `z${i}`;
  TS_GRID_CHILDREN.push(tagId, sampleId, metricId);
  TS_ELEMENTS[tagId] = {
    type: "Text",
    props: { content: row.tag, mono: true, className: "text-2xs uppercase tracking-wider text-muted-foreground" },
    children: [],
  };
  TS_ELEMENTS[sampleId] = row.spec.kind === "heading"
    ? { type: "Heading", props: { text: row.sample, level: row.spec.level, className: row.spec.className }, children: [] }
    : { type: "Text", props: { content: row.sample, size: row.spec.size, muted: row.spec.muted, mono: row.spec.mono, className: row.spec.className }, children: [] };
  TS_ELEMENTS[metricId] = {
    type: "Text",
    props: { content: row.metric, mono: true, className: "text-2xs text-muted-foreground" },
    children: [],
  };
}

export const TYPE_SCALE: BlockDef = {
  id: "type-scale",
  componentName: "TypeScale",
  title: "Type scale",
  description:
    "Eight-step type scale — display, headings, body, caption, mono, eyebrow. Tailwind named sizes throughout.",
  registryDependencies: ["heading", "stack"],
  spec: {
    root: "grid",
    elements: {
      grid: {
        type: "Grid",
        props: { className: "grid-cols-[140px_1fr_80px] items-baseline gap-x-6 gap-y-4 pb-3 border-b border-border" },
        children: TS_GRID_CHILDREN,
      },
      ...TS_ELEMENTS,
    },
  },
};

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

export const BLOCKS: BlockDef[] = [TYPE_SCALE, TICKET_CARD, STATS_CARD, UPGRADE_CARD];
