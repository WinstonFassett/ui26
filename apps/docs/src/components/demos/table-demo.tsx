"use client";

import type { ColumnDef } from "@/components/kibo-ui/table";
import {
  TableProvider,
  TableHeader,
  TableHeaderGroup,
  TableHead,
  TableColumnHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/kibo-ui/table";

type Row = {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "P0" | "P1" | "P2" | "P3";
  updatedAt: string;
};

const statusLabel: Record<Row["status"], string> = {
  todo: "Todo",
  "in-progress": "In Progress",
  review: "In Review",
  done: "Done",
};

const statusDot: Record<Row["status"], string> = {
  todo: "#94a3b8",
  "in-progress": "#f59e0b",
  review: "#6366f1",
  done: "#10b981",
};

const data: Row[] = [
  { id: "d127", title: "Try mixing with external components", status: "in-progress", priority: "P2", updatedAt: "2026-04-23" },
  { id: "a43c", title: "Spike: install Kibo list + table + typography", status: "in-progress", priority: "P2", updatedAt: "2026-04-23" },
  { id: "40d2", title: "Spike: install Kibo theme-switcher", status: "done", priority: "P2", updatedAt: "2026-04-22" },
  { id: "8bc4", title: "Spike: install AI Elements reasoning", status: "done", priority: "P2", updatedAt: "2026-04-22" },
  { id: "e47b", title: "Port shad-compat prereqs: components.json, cn shim", status: "done", priority: "P1", updatedAt: "2026-04-22" },
  { id: "9f3a", title: "Inventory pass: tier remaining Kibo components", status: "todo", priority: "P3", updatedAt: "2026-04-20" },
  { id: "c018", title: "Headless strategy for Radix-heavy ports", status: "todo", priority: "P2", updatedAt: "2026-04-19" },
  { id: "7b2e", title: "Polyglot port decision for AIE reasoning", status: "review", priority: "P2", updatedAt: "2026-04-21" },
];

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <TableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => <TableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => (
      <span className="text-sm">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-2 text-sm">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: statusDot[row.original.status] }}
        />
        {statusLabel[row.original.status]}
      </span>
    ),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => <TableColumnHeader column={column} title="Priority" />,
    cell: ({ row }) => {
      const p = row.original.priority;
      const cls =
        p === "P0" ? "text-destructive font-semibold"
        : p === "P1" ? "text-warn font-semibold"
        : "text-muted-foreground";
      return <span className={`text-xs ${cls}`}>{p}</span>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <TableColumnHeader column={column} title="Updated" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">{row.original.updatedAt}</span>
    ),
  },
];

export function TableDemo() {
  return (
    <div className="rounded-lg border">
      <TableProvider
        columns={columns as ColumnDef<unknown, unknown>[]}
        data={data}
      >
        <TableHeader>
          {({ headerGroup }) => (
            <TableHeaderGroup headerGroup={headerGroup} key={headerGroup.id}>
              {({ header }) => <TableHead header={header} key={header.id} />}
            </TableHeaderGroup>
          )}
        </TableHeader>
        <TableBody>
          {({ row }) => (
            <TableRow row={row} key={row.id}>
              {({ cell }) => <TableCell cell={cell} key={cell.id} />}
            </TableRow>
          )}
        </TableBody>
      </TableProvider>
    </div>
  );
}
