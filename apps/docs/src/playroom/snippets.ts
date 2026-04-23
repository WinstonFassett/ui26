export interface Snippet {
  name: string;
  group: string;
  code: string;
}

const BUTTON = `import { Button } from "@tvui/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-3 p-6">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
`;

const BADGE = `import { Badge } from "@tvui/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-3 p-6">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}
`;

const CARD = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@tvui/react";

export default function App() {
  return (
    <div className="p-6">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Invite a teammate</CardTitle>
          <CardDescription>
            They'll get an email with a link to join your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Paid plans include unlimited seats.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Invite</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
`;

const CHECKBOX = `import { Checkbox, Label } from "@tvui/react";
import { useState } from "react";

export default function App() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-2 p-6">
      <Checkbox
        id="terms"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
`;

const INPUT = `import { Input, Label } from "@tvui/react";

export default function App() {
  return (
    <div className="flex flex-col gap-2 p-6 w-80">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  );
}
`;

const LABEL = `import { Label, Input } from "@tvui/react";

export default function App() {
  return (
    <div className="flex flex-col gap-4 p-6 w-80">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Ada Lovelace" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="handle">Handle</Label>
        <Input id="handle" placeholder="@ada" />
      </div>
    </div>
  );
}
`;

const SEPARATOR = `import { Separator } from "@tvui/react";

export default function App() {
  return (
    <div className="p-6 w-80">
      <h3 className="text-sm font-medium">Radix Primitives</h3>
      <p className="text-sm text-muted-foreground">An open-source UI toolkit.</p>
      <Separator className="my-4" />
      <div className="flex gap-4 text-sm">
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  );
}
`;

const SWITCH = `import { Switch, Label } from "@tvui/react";
import { useState } from "react";

export default function App() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center gap-3 p-6">
      <Switch
        id="notifications"
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
      />
      <Label htmlFor="notifications">Email notifications</Label>
    </div>
  );
}
`;

const TEXTAREA = `import { Textarea, Label } from "@tvui/react";

export default function App() {
  return (
    <div className="flex flex-col gap-2 p-6 w-96">
      <Label htmlFor="msg">Message</Label>
      <Textarea id="msg" rows={4} placeholder="Write something thoughtful..." />
    </div>
  );
}
`;

// ────────────────────────────────── Showcase (from kitchen sink)

const BUTTONS_SHOWCASE = `import { Button } from "@tvui/react";

export default function App() {
  return (
    <div className="p-6 space-y-5">
      <div className="grid grid-cols-[180px_1fr] gap-x-6 gap-y-5 items-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-text-mute">Variants</div>
        <div className="flex gap-2 items-center flex-wrap">
          <Button>Create ticket</Button>
          <Button variant="secondary">Save changes</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="ghost">Discard</Button>
          <Button variant="destructive">Delete machine</Button>
          <Button disabled>Disabled</Button>
        </div>

        <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-text-mute">Sizes</div>
        <div className="flex gap-2 items-center">
          <Button size="sm">Small</Button>
          <Button>Medium</Button>
          <Button size="lg">Large</Button>
        </div>

        <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-text-mute">Group</div>
        <div className="inline-flex border border-border rounded overflow-hidden w-fit">
          <div className="px-3 py-1.5 text-[12px] text-muted-foreground border-r border-border">All</div>
          <div className="px-3 py-1.5 text-[12px] text-foreground font-medium bg-muted border-r border-border">Mine</div>
          <div className="px-3 py-1.5 text-[12px] text-muted-foreground border-r border-border">Assigned</div>
          <div className="px-3 py-1.5 text-[12px] text-muted-foreground">Watching</div>
        </div>
      </div>
    </div>
  );
}
`;

const BADGES_SHOWCASE = `import { Badge } from "@tvui/react";

export default function App() {
  return (
    <div className="p-6 grid grid-cols-[180px_1fr] gap-x-6 gap-y-3.5 items-center">
      <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-text-mute">Status</div>
      <div className="flex gap-1.5 flex-wrap">
        <Badge>Active</Badge>
        <Badge variant="outline" className="text-success">● Shipping</Badge>
        <Badge variant="outline" className="text-warn">● Review</Badge>
        <Badge variant="destructive">Blocked</Badge>
        <Badge variant="outline" className="text-info">● In progress</Badge>
        <Badge variant="outline" className="text-purple">● Draft</Badge>
        <Badge variant="secondary">Archived</Badge>
      </div>

      <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-text-mute">Priority</div>
      <div className="flex gap-1.5">
        <Badge variant="destructive">P0 · Critical</Badge>
        <Badge variant="outline" className="text-warn">P1 · High</Badge>
        <Badge variant="outline" className="text-info">P2 · Medium</Badge>
        <Badge variant="secondary">P3 · Low</Badge>
      </div>

      <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-text-mute">Inline tags</div>
      <div className="flex gap-1.5 flex-wrap">
        <Badge variant="secondary">#billing</Badge>
        <Badge variant="secondary">#fetcher</Badge>
        <Badge variant="secondary">#needs-repro</Badge>
        <Badge variant="secondary">+3</Badge>
      </div>
    </div>
  );
}
`;

const FORM_SIGNUP = `import { Input, Label, Textarea } from "@tvui/react";

export default function App() {
  return (
    <div className="p-6 grid grid-cols-2 gap-7">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="workspace">Workspace name <span className="text-accent">*</span></Label>
          <Input id="workspace" defaultValue="Acme Retrospective" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" defaultValue="acme-retro" />
          <div className="font-mono text-[10px] text-text-mute">lowercase · dashes</div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" aria-invalid />
          <div className="text-[11px] text-destructive flex items-center gap-1.5">
            <span className="font-mono">✕</span>Already in use — try signing in instead
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search tickets, docs, people…" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="bug">Bug description</Label>
          <Textarea
            id="bug"
            rows={5}
            defaultValue={\`After clicking 'Retry' in the paying state, the fetcher briefly flashes back to 'idle' before transitioning to 'loading'. Expected: direct paying → loading.\`}
          />
          <div className="font-mono text-[10px] text-text-mute self-end">198/2000</div>
        </div>
      </div>
    </div>
  );
}
`;

const SELECTION = `import { Checkbox, Switch, Separator } from "@tvui/react";

export default function App() {
  return (
    <div className="p-6 grid grid-cols-3 gap-7">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-text-mute mb-2.5">Checkbox</div>
        <div className="flex flex-col gap-2.5">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <Checkbox defaultChecked className="mt-0.5" />
            <span>
              <span className="block text-[13px] text-foreground leading-[1.35]">Enable streaming responses</span>
              <span className="block text-[11px] text-muted-foreground mt-0.5">Token-by-token updates to the UI.</span>
            </span>
          </label>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <Checkbox className="mt-0.5" />
            <span className="text-[13px] text-foreground">Allow guest edits</span>
          </label>
          <label className="flex items-start gap-2.5 cursor-pointer opacity-50">
            <Checkbox defaultChecked disabled className="mt-0.5" />
            <span>
              <span className="block text-[13px] text-foreground">Legacy sync (enterprise)</span>
              <span className="block text-[11px] text-muted-foreground mt-0.5">Managed by your admin</span>
            </span>
          </label>
        </div>
      </div>

      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-text-mute mb-2.5">Switch</div>
        <div className="flex flex-col gap-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <Switch defaultChecked />
            <span>
              <span className="block text-[13px] text-foreground">Claude suggestions</span>
              <span className="block text-[11px] text-muted-foreground mt-0.5">Inline completions while you type.</span>
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <Switch />
            <span className="text-[13px] text-foreground">Auto-run effects in dev</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <Switch defaultChecked />
            <span>
              <span className="block text-[13px] text-foreground">Telemetry</span>
              <span className="block text-[11px] text-muted-foreground mt-0.5">Anonymous · opt-out any time</span>
            </span>
          </label>
        </div>
      </div>

      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-text-mute mb-2.5">Separator</div>
        <div className="flex flex-col gap-3">
          <div className="text-[13px] text-foreground">Above</div>
          <Separator />
          <div className="text-[13px] text-foreground">Below</div>
        </div>
      </div>
    </div>
  );
}
`;

const CARDS_SHOWCASE = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Button,
} from "@tvui/react";

export default function App() {
  const code = \`const fetcher = createMachine({
  idle: { fetch: 'loading' },
  loading: effect(fetchUser),
});\`;
  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Ticket: Payment retry loop</CardTitle>
          <CardDescription>Flashing back to idle between paying and loading.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-1.5 flex-wrap">
            <Badge variant="destructive">P0</Badge>
            <Badge variant="secondary">#billing</Badge>
            <Badge variant="secondary">#fetcher</Badge>
          </div>
        </CardContent>
        <CardFooter className="pt-5 border-t border-border mt-4">
          <Button size="sm" variant="outline">Open</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inline suggestion</CardTitle>
          <CardDescription>Typing: const fet…</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="font-mono text-[12px] leading-[1.7] bg-code border border-border rounded p-3 overflow-x-auto">
            <code>{code}</code>
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upgrade your plan</CardTitle>
          <CardDescription>Unlock more projects and seats.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-[13px] text-muted-foreground">$19/month, cancel anytime.</p>
        </CardContent>
        <CardFooter className="pt-5 border-t border-border mt-4">
          <Button>Upgrade</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
`;

const TICKET_TABLE = `import { Badge, Button, Checkbox, cn } from "@tvui/react";

const rows = [
  { id: "MCN-142", title: "Payment retry loops past paying → idle briefly", st: "In progress", stCls: "text-info", p: "P1", pTone: "warn", a: ["KM", "JR"], aCol: ["bg-accent", "bg-info"], u: "3m", active: true },
  { id: "MCN-141", title: "useMachine persist flag should accept a key", st: "Review", stCls: "text-warn", p: "P2", pTone: "info", a: ["LS"], aCol: ["bg-success"], u: "1h" },
  { id: "MCN-140", title: "Type inference breaks on nested effect() resolve", st: "Blocked", stCls: "text-destructive", p: "P0", pTone: "destructive", a: ["AP"], aCol: ["bg-purple"], u: "2h" },
  { id: "MCN-139", title: "Docs: examples/checkout.ts missing retry arrow", st: "Draft", stCls: "text-purple", p: "P3", pTone: "secondary", a: ["KM"], aCol: ["bg-accent"], u: "5h" },
  { id: "MCN-138", title: "Add matchState narrow utility to public API", st: "Shipping", stCls: "text-success", p: "P2", pTone: "info", a: ["JR", "AP", "LS"], aCol: ["bg-info", "bg-purple", "bg-success"], u: "yesterday" },
  { id: "MCN-137", title: "Playground: ⌘+Enter should run, not submit", st: "In progress", stCls: "text-info", p: "P2", pTone: "info", a: ["KM"], aCol: ["bg-accent"], u: "yesterday" },
  { id: "MCN-136", title: "createMachine throws on empty state set", st: "Shipping", stCls: "text-success", p: "P1", pTone: "warn", a: ["AP"], aCol: ["bg-purple"], u: "2d" },
];

export default function App() {
  return (
    <div className="p-6">
      <div className="border border-border rounded bg-card overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <span className="text-[13px] font-semibold text-foreground">All issues</span>
          <Badge variant="secondary">128</Badge>
          <span className="flex-1" />
          <Button size="sm" variant="ghost">⌕ Filter</Button>
          <Button size="sm" variant="ghost">↕ Sort</Button>
          <Button size="sm" variant="ghost">⊞ Group by</Button>
          <Button size="sm">＋ New</Button>
        </div>
        <div className="grid grid-cols-[24px_80px_1fr_120px_80px_120px_80px] items-center gap-2.5 px-4 py-2 font-mono text-[10px] tracking-[0.06em] uppercase text-text-mute border-b border-border">
          <span />
          <span>ID</span>
          <span>Title</span>
          <span>Status</span>
          <span>Priority</span>
          <span>Assignees</span>
          <span>Updated</span>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.id}
            className={cn(
              "grid grid-cols-[24px_80px_1fr_120px_80px_120px_80px] items-center gap-2.5 px-4 py-2.5 text-[13px]",
              i < rows.length - 1 && "border-b border-border",
              r.active && "bg-muted",
            )}
          >
            <Checkbox defaultChecked={r.active} />
            <span className="font-mono text-[11px] text-muted-foreground">{r.id}</span>
            <span className="text-foreground tracking-[-0.005em]">{r.title}</span>
            <Badge variant="outline" className={r.stCls}>● {r.st}</Badge>
            <Badge
              variant={r.pTone === "destructive" ? "destructive" : r.pTone === "secondary" ? "secondary" : "outline"}
              className={r.pTone === "warn" ? "text-warn" : r.pTone === "info" ? "text-info" : ""}
            >{r.p}</Badge>
            <div className="flex">
              {r.a.map((name, j) => (
                <div
                  key={name + j}
                  className={cn(
                    "w-[18px] h-[18px] rounded-full grid place-items-center font-mono text-[8px] font-semibold text-background border-2",
                    r.active ? "border-muted" : "border-card",
                    r.aCol[j],
                  )}
                  style={j > 0 ? { marginLeft: -5 } : undefined}
                >{name}</div>
              ))}
            </div>
            <span className="font-mono text-[11px] text-text-mute">{r.u}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

const TICKET_DETAIL = `import { Badge, cn } from "@tvui/react";

const activity = [
  { who: "JR", txt: "reproduced locally — looks like mount order in React 18", t: "12m" },
  { who: "KM", txt: "posted a patch: lift the machine out of the component", t: "8m" },
  { who: "✦", accent: true, txt: "Claude · linked this to MCN-140 (inference regression)", t: "3m" },
];

export default function App() {
  return (
    <div className="p-6">
      <div className="border border-border rounded bg-card overflow-hidden max-w-[640px]">
        <div className="px-5 py-3.5 border-b border-border">
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] tracking-[0.06em] uppercase text-text-mute">
            <span>MCN-142</span>
            <span>·</span>
            <Badge variant="outline" className="text-info">● In progress</Badge>
            <Badge variant="outline" className="text-warn">P1</Badge>
          </div>
          <div className="font-sans text-[22px] font-semibold tracking-[-0.015em] leading-[1.25] text-foreground">
            Payment retry loops past <code className="font-mono text-[18px] bg-code border border-border px-1">paying</code> → <code className="font-mono text-[18px] bg-code border border-border px-1">idle</code>
          </div>
        </div>
        <div className="p-5 text-[13.5px] leading-[1.65]">
          <p className="m-0 text-muted-foreground">
            When a component using <code className="font-mono bg-code border border-border px-1">useMachine(checkout)</code> unmounts between <em>paying</em> and <em>retry</em>, the machine is re-initialized and we get a spurious <em>idle → loading</em> hop in history.
          </p>
          <h3 className="font-sans text-[13px] font-semibold mt-4 mb-1.5 text-foreground">Repro</h3>
          <ol className="m-0 pl-5 text-muted-foreground">
            <li>Open <code className="font-mono bg-code border border-border px-1">examples/checkout</code></li>
            <li>Add an item, click <em>Pay</em></li>
            <li>Navigate away, back; click <em>Retry</em></li>
            <li>Inspect <code className="font-mono bg-code border border-border px-1">machine.history</code></li>
          </ol>
          <div className="flex items-center gap-2.5 my-3">
            <div className="flex-1 h-px bg-border" />
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-text-mute">Activity</div>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="flex flex-col gap-2.5">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-2.5 text-[12px] text-muted-foreground leading-[1.5]">
                <span
                  className={cn(
                    "w-5 h-5 rounded-full grid place-items-center font-mono text-[10px] font-semibold flex-shrink-0 border border-border",
                    a.accent ? "bg-accent text-accent-ink" : "bg-muted text-foreground",
                  )}
                >{a.who}</span>
                <span className="flex-1">{a.txt}</span>
                <span className="font-mono text-[10px] text-text-mute">{a.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const DOCUMENT_EDITOR = `import { Badge, Button } from "@tvui/react";

export default function App() {
  return (
    <div className="p-6">
      <div className="border border-border rounded bg-card overflow-hidden max-w-[640px]">
        <div className="px-4 py-2.5 border-b border-border flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span className="text-foreground font-semibold">B</span>
          <span className="italic">I</span>
          <span className="underline">U</span>
          <span className="line-through">S</span>
          <span className="text-border">│</span>
          <span>H1</span><span>H2</span>
          <span className="text-border">│</span>
          <span>⌘</span><span>"</span><span>&lt;/&gt;</span>
          <span className="text-border">│</span>
          <Badge>● Claude edit</Badge>
          <span className="ml-auto">2 edits · saved</span>
        </div>
        <div className="px-5 py-5 text-[14px] leading-[1.65]">
          <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-text-mute mb-1.5">Post-mortem · Oct 17</div>
          <div className="font-serif font-medium text-[28px] tracking-[-0.015em] leading-[1.15] mb-2.5 text-foreground">
            Why our checkout machine forgot itself <em className="text-muted-foreground">for 4 milliseconds.</em>
          </div>
          <p className="m-0 mb-2.5 text-muted-foreground">
            <strong className="text-foreground font-semibold">tl;dr</strong> — a stale closure in the React binding caused the fetcher machine to remount between paying and retry, corrupting the transition log.
          </p>
          <h3 className="font-sans text-[14px] font-semibold mt-4 mb-1.5 text-foreground">Timeline</h3>
          <ul className="m-0 pl-5 text-muted-foreground">
            <li><strong className="text-foreground">14:02</strong> — user reports retry bug in #support</li>
            <li><strong className="text-foreground">14:08</strong> — repro confirmed by JR</li>
            <li><strong className="text-foreground">14:31</strong> — KM lands patch behind feature flag</li>
          </ul>
          <div className="mt-4 px-3 py-2.5 border-l-2 border-accent bg-accent-soft text-[12.5px]">
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-accent mb-1">Lesson</div>
            Never bind a machine to a component's lifetime. Always lift, or wire persistence.
          </div>
          <div className="mt-3.5 border border-dashed border-accent rounded px-3 py-2.5 text-[12.5px]">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-accent font-mono">✦</span>
              <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-accent">Claude suggestion</span>
            </div>
            Add a code snippet showing the fix with <code className="font-mono bg-code border border-border px-1">{'useMachine(m, { persist: \\'checkout\\' })'}</code>.
            <div className="flex gap-1.5 mt-2">
              <Button size="sm">Accept</Button>
              <Button size="sm" variant="ghost">Dismiss</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const TOASTS = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  cn,
} from "@tvui/react";

const notes = [
  { tone: "success", i: "✓", title: "Machine deployed", s: "checkout@2.1.0 · 1.2kb gzipped" },
  { tone: "warn", i: "⚠", title: "Effect timed out", s: "fetchUser() exceeded 3s — retrying" },
  { tone: "destructive", i: "✕", title: "Type error in transitions", s: "paying.fail → \\"falied\\" — did you mean \\"failed\\"?" },
  { tone: "info", i: "ℹ", title: "Claude finished rollup", s: "42 tickets → 7 changelog entries · Review now ↗" },
];

export default function App() {
  return (
    <div className="p-6">
      <Card className="max-w-[480px]">
        <CardHeader>
          <CardDescription className="font-mono text-[10px] tracking-[0.08em] uppercase text-text-mute">Toasts</CardDescription>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {notes.map((n, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-3 border border-border bg-card px-3 py-2.5 rounded border-l-2",
                  n.tone === "success" && "border-l-success",
                  n.tone === "warn" && "border-l-warn",
                  n.tone === "destructive" && "border-l-destructive",
                  n.tone === "info" && "border-l-info",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[13px]",
                    n.tone === "success" && "text-success",
                    n.tone === "warn" && "text-warn",
                    n.tone === "destructive" && "text-destructive",
                    n.tone === "info" && "text-info",
                  )}
                >{n.i}</span>
                <span className="flex-1">
                  <span className="block text-[13px] font-medium text-foreground">{n.title}</span>
                  <span className="block text-[11.5px] text-muted-foreground mt-0.5">{n.s}</span>
                </span>
                <span className="text-text-mute font-mono text-[11px]">✕</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
`;

const CONFIRM_DIALOG = `import { Button, Checkbox, Input, Label } from "@tvui/react";

export default function App() {
  return (
    <div className="p-6">
      <div className="border border-border rounded bg-card overflow-hidden max-w-[440px]">
        <div className="px-5 pt-5">
          <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-text-mute mb-1.5">Dialog</div>
          <div className="text-[14px] font-semibold text-foreground">Delete state machine?</div>
        </div>
        <div className="px-5 py-4 text-[13px] text-muted-foreground leading-[1.55]">
          <p className="m-0">
            This will permanently remove <strong className="text-foreground font-mono text-[12px] bg-code border border-border px-1">checkout</strong> and all <strong className="text-foreground">14</strong> connected effects.
          </p>
          <div className="mt-3 flex flex-col gap-1.5">
            <Label htmlFor="confirm">Type 'checkout' to confirm</Label>
            <Input id="confirm" defaultValue="checkout" />
          </div>
          <div className="mt-2.5">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <Checkbox />
              <span className="text-[13px] text-foreground">I understand this cannot be undone.</span>
            </label>
          </div>
        </div>
        <div className="px-5 py-3 border-t border-border flex gap-2 justify-end bg-muted">
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive">Delete machine</Button>
        </div>
      </div>
    </div>
  );
}
`;

const TABS_STATS = `import { Separator, cn } from "@tvui/react";

const tabs = [
  { l: "Overview", active: true },
  { l: "States", n: 5 },
  { l: "Transitions", n: 6 },
  { l: "Effects", n: 2 },
  { l: "History", n: 42 },
];
const bars = [36, 42, 58, 31, 77, 64, 81];
const days = ["M", "T", "W", "T", "F", "S", "S"];
const stats = [
  { l: "Transitions", v: "1,284", d: "+12%", pos: true },
  { l: "Avg latency", v: "142ms", d: "-6%", pos: true },
  { l: "Error rate", v: "0.3%", d: "+0.1%", pos: false },
];

export default function App() {
  return (
    <div className="p-6">
      <div className="border border-border rounded bg-card overflow-hidden max-w-[640px]">
        <div className="flex border-b border-border pl-3.5">
          {tabs.map((tab, i) => (
            <div
              key={i}
              className={cn(
                "px-4 py-3 text-[13px] flex gap-1.5 items-center -mb-px",
                tab.active
                  ? "text-foreground font-medium border-b-[1.5px] border-accent"
                  : "text-muted-foreground",
              )}
            >
              <span>{tab.l}</span>
              {typeof tab.n === "number" && (
                <span className="font-mono text-[10px] text-text-mute bg-muted px-1.5 border border-border">{tab.n}</span>
              )}
            </div>
          ))}
        </div>
        <div className="p-5">
          <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-text-mute mb-2">Daily transitions · past 7 days</div>
          <div className="flex items-end gap-1.5 h-20">
            {bars.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "w-full border",
                    i === 6 ? "bg-accent border-accent" : "bg-secondary border-border",
                  )}
                  style={{ height: v }}
                />
                <div className="font-mono text-[9px] text-text-mute">{days[i]}</div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="font-mono text-[10px] text-text-mute tracking-[0.06em] uppercase">{s.l}</div>
                <div className="font-serif italic font-medium text-[28px] tracking-[-0.02em] text-foreground mt-1">{s.v}</div>
                <div className={cn("font-mono text-[10px] mt-0.5", s.pos ? "text-success" : "text-destructive")}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const ONBOARDING = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  cn,
} from "@tvui/react";

const steps = [
  { n: 1, l: "Install matchina", d: "$ npm i matchina", s: "done" },
  { n: 2, l: "Define a machine", d: "createMachine({ idle, loading, … })", s: "active" },
  { n: 3, l: "Mount in your app", d: "useMachine(machine)", s: "pending" },
  { n: 4, l: "Test transitions", d: 'machine.send("start")', s: "pending" },
];

export default function App() {
  return (
    <div className="p-6">
      <Card className="max-w-[480px]">
        <CardHeader>
          <CardDescription className="font-mono text-[10px] tracking-[0.08em] uppercase text-text-mute">Onboarding</CardDescription>
          <CardTitle>Connect your first machine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3.5">
            <div>
              <div className="flex justify-between font-mono text-[10px] text-text-mute tracking-[0.06em] uppercase mb-1.5">
                <span>Step 2 of 4</span>
                <span>50%</span>
              </div>
              <div className="h-1 bg-secondary border border-border rounded-full relative overflow-hidden">
                <div className="absolute inset-0 right-1/2 bg-accent" />
              </div>
            </div>
            {steps.map((st) => (
              <div key={st.n} className="flex gap-3 items-start">
                <div
                  className={cn(
                    "w-[22px] h-[22px] border grid place-items-center font-mono text-[11px] font-semibold flex-shrink-0 rounded-full",
                    st.s === "done" && "bg-accent border-accent text-accent-ink",
                    st.s === "active" && "border-accent text-accent",
                    st.s === "pending" && "border-border text-text-mute",
                  )}
                >{st.s === "done" ? "✓" : st.n}</div>
                <div className={cn("flex-1", st.s === "pending" && "opacity-55")}>
                  <div className={cn("text-[13px] text-foreground", st.s === "active" && "font-medium")}>{st.l}</div>
                  <div className="font-mono text-[11px] text-muted-foreground mt-0.5">{st.d}</div>
                </div>
                {st.s === "active" && <Button size="sm">Open</Button>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
`;

const CONTEXT_MENU = `import { cn } from "@tvui/react";

type Item =
  | { sep: true }
  | { i: string; l: string; k: string; active?: boolean; danger?: boolean; sep?: undefined };

const items: Item[] = [
  { i: "↵", l: "Open", k: "↵", active: true },
  { i: "↗", l: "Open in new tab", k: "⌘↵" },
  { i: "⎘", l: "Copy link", k: "⌘C" },
  { sep: true },
  { i: "↑", l: "Assign to…", k: "A" },
  { i: "⧉", l: "Duplicate", k: "D" },
  { sep: true },
  { i: "✕", l: "Delete", k: "⌫", danger: true },
];

export default function App() {
  return (
    <div className="p-6">
      <div className="border border-border rounded bg-card overflow-hidden max-w-[280px]">
        <div className="px-5 pt-5">
          <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-text-mute mb-1.5">Menu (right-click)</div>
          <div className="text-[14px] font-semibold text-foreground mb-2.5">Ticket actions</div>
        </div>
        {items.map((m, i) =>
          m.sep ? (
            <div key={i} className="h-px bg-border mx-2" />
          ) : (
            <div
              key={i}
              className={cn(
                "px-4 py-1.5 flex items-center gap-2.5 text-[13px]",
                m.danger ? "text-destructive" : "text-foreground",
                m.active && "bg-muted",
              )}
            >
              <span className={cn("font-mono text-[11px] w-3.5", m.danger ? "text-destructive" : "text-text-mute")}>{m.i}</span>
              <span className="flex-1">{m.l}</span>
              <span className="font-mono text-[10px] text-text-mute">{m.k}</span>
            </div>
          ),
        )}
        <div className="h-4" />
      </div>
    </div>
  );
}
`;

const TOOLTIP = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
} from "@tvui/react";

export default function App() {
  return (
    <div className="p-6">
      <Card className="max-w-[480px]">
        <CardHeader>
          <CardDescription className="font-mono text-[10px] tracking-[0.08em] uppercase text-text-mute">Tooltip</CardDescription>
          <CardTitle>Hover states</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-5 items-center py-5">
            <div className="relative">
              <Button variant="outline">↑ Assign</Button>
              <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-foreground text-background px-2 py-1 text-[11px] whitespace-nowrap rounded">
                Assign ticket <span className="font-mono text-text-mute ml-1">A</span>
              </div>
            </div>
            <Button variant="outline">🕮 Docs</Button>
            <Button variant="outline">⌘ ⌘K</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
`;

const EMPTY_STATE = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
} from "@tvui/react";

export default function App() {
  return (
    <div className="p-6">
      <Card className="max-w-[360px]">
        <CardHeader>
          <CardDescription className="font-mono text-[10px] tracking-[0.08em] uppercase text-text-mute">Empty state</CardDescription>
          <CardTitle>No tickets match</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-2.5 text-center">
            <div className="mx-auto mb-3 w-10 h-10 border border-dashed border-border grid place-items-center text-text-mute font-mono text-[14px] rounded">∅</div>
            <div className="text-[13px] text-foreground font-medium mb-1">Nothing here yet</div>
            <div className="text-[12px] text-muted-foreground mb-3">Try loosening the filter, or let Claude draft a ticket for you.</div>
            <div className="flex gap-1.5 justify-center">
              <Button size="sm" variant="ghost">Clear filters</Button>
              <Button size="sm">✦ Draft with Claude</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
`;

const COMMAND_PALETTE = `import { cn } from "@tvui/react";

const commands = [
  { ico: "✦", l: "Ask Claude", s: "Free-form prompt with current file", k: "⌘↵", active: true },
  { ico: "⤓", l: "Apply fix", s: "Use the suggestion from turn 6", k: "⌥↵" },
  { ico: "⎘", l: "Copy as markdown", s: "Conversation export", k: "⇧⎘" },
  { ico: "↗", l: "Open in new ticket", s: "From conversation thread", k: "⌘N" },
  { ico: "⌕", l: "Search tickets", s: "Text · labels · assignee", k: "⌘P" },
];

export default function App() {
  return (
    <div className="p-6">
      <div className="max-w-[620px] border border-border rounded bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2.5">
          <span className="text-text-mute font-mono">/</span>
          <span className="flex-1 text-[14px] text-foreground">ask claude to refactor checkout.ts</span>
          <kbd className="font-mono text-[10px] border border-border px-1.5 py-px text-muted-foreground bg-muted rounded">↵</kbd>
        </div>
        {commands.map((c, i) => (
          <div
            key={i}
            className={cn(
              "px-4 py-2 flex items-center gap-3.5",
              i < commands.length - 1 && "border-b border-border",
              c.active && "bg-muted",
            )}
          >
            <span className="text-accent font-mono text-[14px] w-4">{c.ico}</span>
            <span className="flex-1">
              <span className="block text-[13px] text-foreground">{c.l}</span>
              <span className="block text-[11px] text-muted-foreground mt-0.5">{c.s}</span>
            </span>
            <kbd className="font-mono text-[10px] border border-border px-1.5 py-px text-muted-foreground bg-muted rounded">{c.k}</kbd>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

export const snippets: Snippet[] = [
  { name: "Button", group: "Primitives", code: BUTTON },
  { name: "Badge", group: "Primitives", code: BADGE },
  { name: "Card", group: "Primitives", code: CARD },
  { name: "Checkbox", group: "Primitives", code: CHECKBOX },
  { name: "Input", group: "Primitives", code: INPUT },
  { name: "Label", group: "Primitives", code: LABEL },
  { name: "Separator", group: "Primitives", code: SEPARATOR },
  { name: "Switch", group: "Primitives", code: SWITCH },
  { name: "Textarea", group: "Primitives", code: TEXTAREA },
  { name: "Buttons — variants, sizes, group", group: "Showcase", code: BUTTONS_SHOWCASE },
  { name: "Badges & labels", group: "Showcase", code: BADGES_SHOWCASE },
  { name: "Cards — three up", group: "Showcase", code: CARDS_SHOWCASE },
  { name: "Form — sign up", group: "Showcase", code: FORM_SIGNUP },
  { name: "Selection controls", group: "Showcase", code: SELECTION },
  { name: "Ticket table", group: "Scenes", code: TICKET_TABLE },
  { name: "Ticket detail", group: "Scenes", code: TICKET_DETAIL },
  { name: "Document editor", group: "Scenes", code: DOCUMENT_EDITOR },
  { name: "Toasts", group: "Overlays", code: TOASTS },
  { name: "Confirm dialog", group: "Overlays", code: CONFIRM_DIALOG },
  { name: "Tabs + stats", group: "Overlays", code: TABS_STATS },
  { name: "Onboarding checklist", group: "Overlays", code: ONBOARDING },
  { name: "Context menu", group: "Overlays", code: CONTEXT_MENU },
  { name: "Tooltip", group: "Overlays", code: TOOLTIP },
  { name: "Empty state", group: "Overlays", code: EMPTY_STATE },
  { name: "Command palette", group: "Overlays", code: COMMAND_PALETTE },
];

export const defaultSnippet = BUTTON;
