import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const GRID = "grid grid-cols-[24px_80px_1fr_120px_80px_100px_80px] items-center gap-2.5 px-4";

const tickets = [
  { id: "MCN-142", title: "Payment retry loops past paying → idle briefly",  status: "In progress", statusCls: "text-blue-500",   priority: "P1", priVariant: "outline"      as const, priCls: "text-yellow-500", assignees: "KM · JR",      updated: "3m",        active: true  },
  { id: "MCN-141", title: "useMachine persist flag should accept a key",      status: "Review",      statusCls: "text-yellow-500", priority: "P2", priVariant: "outline"      as const, priCls: "text-blue-500",   assignees: "LS",           updated: "1h"               },
  { id: "MCN-140", title: "Type inference breaks on nested effect() resolve", status: "Blocked",     statusCls: "text-red-500",    priority: "P0", priVariant: "destructive"  as const, priCls: "",               assignees: "AP",           updated: "2h"               },
  { id: "MCN-139", title: "Docs: examples/checkout.ts missing retry arrow",   status: "Draft",       statusCls: "text-purple-500", priority: "P3", priVariant: "secondary"    as const, priCls: "",               assignees: "KM",           updated: "5h"               },
  { id: "MCN-138", title: "Add matchState narrow utility to public API",       status: "Shipping",    statusCls: "text-green-500",  priority: "P2", priVariant: "outline"      as const, priCls: "text-blue-500",   assignees: "JR · AP · LS", updated: "yesterday"        },
  { id: "MCN-137", title: "Playground: ⌘+Enter should run, not submit",       status: "In progress", statusCls: "text-blue-500",   priority: "P2", priVariant: "outline"      as const, priCls: "text-blue-500",   assignees: "KM",           updated: "yesterday"        },
  { id: "MCN-136", title: "createMachine throws on empty state set",           status: "Shipping",    statusCls: "text-green-500",  priority: "P1", priVariant: "outline"      as const, priCls: "text-yellow-500", assignees: "AP",           updated: "2d"               },
];

export function TicketTable() {
  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <span className="text-[13px] font-semibold">All issues</span>
        <Badge variant="secondary">128</Badge>
        <div className="flex-1" />
        <Button variant="ghost" size="sm">⌕ Filter</Button>
        <Button variant="ghost" size="sm">↕ Sort</Button>
        <Button variant="ghost" size="sm">⊞ Group</Button>
        <Button size="sm">＋ New</Button>
      </div>

      {/* Column headers */}
      <div className={`${GRID} py-2 border-b border-border font-mono text-[10px] tracking-[0.06em] uppercase text-muted-foreground`}>
        <span />
        <span>ID</span>
        <span>Title</span>
        <span>Status</span>
        <span>Priority</span>
        <span>Assignees</span>
        <span>Updated</span>
      </div>

      {/* Rows */}
      {tickets.map((t) => (
        <div
          key={t.id}
          className={`${GRID} py-2.5 border-b border-border last:border-0 ${t.active ? "bg-muted" : ""}`}
        >
          <Checkbox defaultChecked={t.active} />
          <span className="font-mono text-[11px] text-muted-foreground">{t.id}</span>
          <span className="text-[13px] tracking-[-0.005em]">{t.title}</span>
          <Badge variant="outline" className={t.statusCls}>● {t.status}</Badge>
          <Badge variant={t.priVariant} className={t.priCls}>{t.priority}</Badge>
          <span className="font-mono text-[11px] text-muted-foreground">{t.assignees}</span>
          <span className="font-mono text-[11px] text-muted-foreground">{t.updated}</span>
        </div>
      ))}
    </div>
  );
}
