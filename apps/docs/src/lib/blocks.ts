import type { Spec } from "@/lib/spec-to-code";

export type BlockCategory = "Editorial" | "Cards" | "Forms" | "Marketing" | "Productivity" | "AI";

export interface BlockDef {
  /** kebab-case name used in URLs, registry, filenames */
  id: string;
  /** PascalCase component name used in generated React code */
  componentName: string;
  title: string;
  description: string;
  category: BlockCategory;
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
  category: "Editorial",
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
  category: "Cards",
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
  category: "Cards",
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
  category: "Marketing",
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

export const SIGN_IN_FORM: BlockDef = {
  id: "sign-in-form",
  componentName: "SignInForm",
  title: "Sign-in form",
  description:
    "Email + password form composed from Field primitives, with helper text and a submit row.",
  category: "Forms",
  registryDependencies: ["card", "field", "input", "button"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: { className: "max-w-sm" }, children: ["hdr", "content", "footer"] },
      hdr: { type: "CardHeader", props: {}, children: ["title", "desc"] },
      title: { type: "CardTitle", props: { text: "Sign in" }, children: [] },
      desc: {
        type: "CardDescription",
        props: { text: "Use your work email to continue." },
        children: [],
      },
      content: { type: "CardContent", props: {}, children: ["group"] },
      group: { type: "FieldGroup", props: {}, children: ["f-email", "f-pw"] },
      "f-email": { type: "Field", props: {}, children: ["lbl-email", "in-email", "desc-email"] },
      "lbl-email": { type: "FieldLabel", props: { text: "Email", htmlFor: "email" }, children: [] },
      "in-email": { type: "Input", props: { type: "email", placeholder: "you@company.com" }, children: [] },
      "desc-email": { type: "FieldDescription", props: { text: "We'll never share your email." }, children: [] },
      "f-pw": { type: "Field", props: {}, children: ["lbl-pw", "in-pw"] },
      "lbl-pw": { type: "FieldLabel", props: { text: "Password", htmlFor: "password" }, children: [] },
      "in-pw": { type: "Input", props: { type: "password", placeholder: "••••••••" }, children: [] },
      footer: { type: "CardFooter", props: {}, children: ["btn"] },
      btn: { type: "Button", props: { label: "Continue", className: "w-full" }, children: [] },
    },
  },
};

export const KPI_STRIP: BlockDef = {
  id: "kpi-strip",
  componentName: "KpiStrip",
  title: "KPI strip",
  description:
    "Three-column metric strip — label, value, delta — for dashboard headers and overview banners.",
  category: "Cards",
  registryDependencies: ["card", "grid"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["content"] },
      content: { type: "CardContent", props: { className: "py-6" }, children: ["grid"] },
      grid: { type: "Grid", props: { className: "grid-cols-3 gap-6" }, children: ["k1", "k2", "k3"] },
      k1: { type: "Stack", props: { direction: "col", gap: "1" }, children: ["k1-lbl", "k1-val", "k1-delta"] },
      "k1-lbl": { type: "Text", props: { content: "MRR", size: "xs", mono: true, className: "uppercase tracking-wider text-muted-foreground" }, children: [] },
      "k1-val": { type: "Heading", props: { text: "$24.6k", level: "h3", className: "tabular-nums" }, children: [] },
      "k1-delta": { type: "Text", props: { content: "+12.4% vs last month", size: "xs", muted: true }, children: [] },
      k2: { type: "Stack", props: { direction: "col", gap: "1" }, children: ["k2-lbl", "k2-val", "k2-delta"] },
      "k2-lbl": { type: "Text", props: { content: "Active users", size: "xs", mono: true, className: "uppercase tracking-wider text-muted-foreground" }, children: [] },
      "k2-val": { type: "Heading", props: { text: "1,284", level: "h3", className: "tabular-nums" }, children: [] },
      "k2-delta": { type: "Text", props: { content: "+8.1% vs last month", size: "xs", muted: true }, children: [] },
      k3: { type: "Stack", props: { direction: "col", gap: "1" }, children: ["k3-lbl", "k3-val", "k3-delta"] },
      "k3-lbl": { type: "Text", props: { content: "Churn", size: "xs", mono: true, className: "uppercase tracking-wider text-muted-foreground" }, children: [] },
      "k3-val": { type: "Heading", props: { text: "0.6%", level: "h3", className: "tabular-nums" }, children: [] },
      "k3-delta": { type: "Text", props: { content: "−0.2pp vs last month", size: "xs", muted: true }, children: [] },
    },
  },
};

export const EMPTY_STATE: BlockDef = {
  id: "empty-state",
  componentName: "EmptyState",
  title: "Empty state",
  description:
    "Centered empty state — eyebrow, headline, helper copy, primary CTA. For zero-data screens.",
  category: "Marketing",
  registryDependencies: ["card", "stack", "heading", "button"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: { className: "text-center" }, children: ["content"] },
      content: { type: "CardContent", props: { className: "py-14" }, children: ["stack"] },
      stack: { type: "Stack", props: { direction: "col", gap: "3", align: "center" }, children: ["eb", "hd", "body", "btn"] },
      eb: { type: "Text", props: { content: "no projects yet", size: "xs", mono: true, className: "uppercase tracking-wider text-muted-foreground" }, children: [] },
      hd: { type: "Heading", props: { text: "Start your first project", level: "h2" }, children: [] },
      body: { type: "Text", props: { content: "Projects organize machines, tickets, and team activity. You can rename them anytime.", size: "sm", muted: true, className: "max-w-sm" }, children: [] },
      btn: { type: "Button", props: { label: "New project" }, children: [] },
    },
  },
};

export const ACTIVITY_FEED: BlockDef = {
  id: "activity-feed",
  componentName: "ActivityFeed",
  title: "Activity feed",
  description:
    "Card with a stack of timeline entries — actor, action, timestamp. For project changelogs and audit panes.",
  category: "Productivity",
  registryDependencies: ["card", "stack", "badge"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["hdr", "content"] },
      hdr: { type: "CardHeader", props: {}, children: ["title", "desc"] },
      title: { type: "CardTitle", props: { text: "Recent activity" }, children: [] },
      desc: {
        type: "CardDescription",
        props: { text: "Last 7 days across all machines." },
        children: [],
      },
      content: { type: "CardContent", props: {}, children: ["stack"] },
      stack: { type: "Stack", props: { direction: "col", gap: "3" }, children: ["r1", "r2", "r3"] },
      r1: {
        type: "Stack",
        props: { direction: "row", gap: "3", align: "center" },
        children: ["b1", "t1", "ts1"],
      },
      b1: { type: "Badge", props: { text: "ship", variant: "default" }, children: [] },
      t1: {
        type: "Text",
        props: { content: "kai shipped Payment retry loop", size: "sm", className: "flex-1" },
        children: [],
      },
      ts1: { type: "Text", props: { content: "3h", size: "xs", muted: true, mono: true }, children: [] },
      r2: {
        type: "Stack",
        props: { direction: "row", gap: "3", align: "center" },
        children: ["b2", "t2", "ts2"],
      },
      b2: { type: "Badge", props: { text: "merge", variant: "secondary" }, children: [] },
      t2: {
        type: "Text",
        props: { content: "winston merged Field family port", size: "sm", className: "flex-1" },
        children: [],
      },
      ts2: { type: "Text", props: { content: "5h", size: "xs", muted: true, mono: true }, children: [] },
      r3: {
        type: "Stack",
        props: { direction: "row", gap: "3", align: "center" },
        children: ["b3", "t3", "ts3"],
      },
      b3: { type: "Badge", props: { text: "open", variant: "outline" }, children: [] },
      t3: {
        type: "Text",
        props: { content: "ai opened Investigate flaky checkout test", size: "sm", className: "flex-1" },
        children: [],
      },
      ts3: { type: "Text", props: { content: "1d", size: "xs", muted: true, mono: true }, children: [] },
    },
  },
};

export const COMMAND_PALETTE: BlockDef = {
  id: "command-palette",
  componentName: "CommandPalette",
  title: "Command palette",
  description:
    "Search-first action launcher — Input header, suggestion rows with keyboard hint chips. Static markup; wire your own keyboard handler.",
  category: "Productivity",
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
};

export const AI_MESSAGE: BlockDef = {
  id: "ai-message",
  componentName: "AiMessage",
  title: "AI message thread",
  description:
    "Card showing one user/assistant exchange — role eyebrow, message body, and a quiet provenance footer. For chat surfaces and inline copilots.",
  category: "AI",
  registryDependencies: ["card", "stack", "badge"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: { className: "max-w-lg" }, children: ["content", "footer"] },
      content: { type: "CardContent", props: { className: "py-5" }, children: ["stack"] },
      stack: { type: "Stack", props: { direction: "col", gap: "5" }, children: ["u-stack", "a-stack"] },
      "u-stack": { type: "Stack", props: { direction: "col", gap: "1.5" }, children: ["u-eb", "u-body"] },
      "u-eb": {
        type: "Text",
        props: { content: "you · 2:14pm", size: "xs", mono: true, className: "uppercase tracking-wider text-muted-foreground" },
        children: [],
      },
      "u-body": {
        type: "Text",
        props: { content: "Why is the checkout test flaky on Mondays only?", size: "sm" },
        children: [],
      },
      "a-stack": { type: "Stack", props: { direction: "col", gap: "1.5" }, children: ["a-eb", "a-body"] },
      "a-eb": {
        type: "Text",
        props: { content: "claude · synthesised", size: "xs", mono: true, className: "uppercase tracking-wider text-accent" },
        children: [],
      },
      "a-body": {
        type: "Text",
        props: {
          content:
            "Likely a weekend cron that recycles staging Stripe keys. The first Monday run sees stale keys until the seed job catches up. Run `pnpm seed:stripe` before the test or move the cron to Sundays.",
          size: "sm",
          className: "leading-relaxed",
        },
        children: [],
      },
      footer: { type: "CardFooter", props: { className: "border-t border-border" }, children: ["foot"] },
      foot: {
        type: "Stack",
        props: { direction: "row", gap: "2", align: "center" },
        children: ["fb1", "fb2"],
      },
      fb1: { type: "Badge", props: { text: "3 sources", variant: "secondary" }, children: [] },
      fb2: { type: "Badge", props: { text: "model: opus-4.7", variant: "outline", className: "font-mono" }, children: [] },
    },
  },
};

export const BLOCKS: BlockDef[] = [
  TYPE_SCALE,
  TICKET_CARD,
  STATS_CARD,
  KPI_STRIP,
  UPGRADE_CARD,
  EMPTY_STATE,
  SIGN_IN_FORM,
  ACTIVITY_FEED,
  COMMAND_PALETTE,
  AI_MESSAGE,
];
