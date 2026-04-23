"use client";

import { useState } from "react";
import {
  ListProvider,
  ListGroup,
  ListHeader,
  ListItems,
  ListItem,
  type DragEndEvent,
} from "@/components/kibo-ui/list";

type Status = { id: string; name: string; color: string };
type Ticket = {
  id: string;
  title: string;
  statusId: string;
  priority: "P0" | "P1" | "P2" | "P3";
  tag?: string;
};

const statuses: Status[] = [
  { id: "todo", name: "Todo", color: "#94a3b8" },
  { id: "in-progress", name: "In Progress", color: "#f59e0b" },
  { id: "review", name: "In Review", color: "#6366f1" },
  { id: "done", name: "Done", color: "#10b981" },
];

const initial: Ticket[] = [
  { id: "d127", title: "Try mixing with external components", statusId: "in-progress", priority: "P2", tag: "epic" },
  { id: "a43c", title: "Spike: install Kibo list + table + typography", statusId: "in-progress", priority: "P2", tag: "spike" },
  { id: "40d2", title: "Spike: install Kibo theme-switcher", statusId: "done", priority: "P2", tag: "spike" },
  { id: "8bc4", title: "Spike: install AI Elements reasoning", statusId: "done", priority: "P2", tag: "spike" },
  { id: "e47b", title: "Port shad-compat prereqs: components.json, cn shim", statusId: "done", priority: "P1" },
  { id: "9f3a", title: "Inventory pass: tier remaining Kibo components", statusId: "todo", priority: "P3" },
  { id: "c018", title: "Headless strategy for Radix-heavy ports", statusId: "todo", priority: "P2" },
  { id: "7b2e", title: "Polyglot port decision for AIE reasoning", statusId: "review", priority: "P2" },
];

const priorityStyles: Record<Ticket["priority"], string> = {
  P0: "text-destructive font-semibold",
  P1: "text-warn font-semibold",
  P2: "text-muted-foreground",
  P3: "text-muted-foreground/70",
};

export function ListDemo() {
  const [tickets, setTickets] = useState(initial);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const nextStatus = over.id as string;
    setTickets((prev) =>
      prev.map((t) => (t.id === active.id ? { ...t, statusId: nextStatus } : t))
    );
  };

  return (
    <ListProvider onDragEnd={handleDragEnd} className="h-[480px] rounded-lg border">
      <div className="grid h-full grid-cols-4 divide-x overflow-hidden">
        {statuses.map((status) => {
          const inStatus = tickets.filter((t) => t.statusId === status.id);
          return (
            <ListGroup id={status.id} key={status.id} className="flex flex-col overflow-y-auto">
              <ListHeader name={status.name} color={status.color} />
              <ListItems>
                {inStatus.length === 0 ? (
                  <p className="m-0 px-2 py-1 text-xs text-muted-foreground/60">No tickets</p>
                ) : (
                  inStatus.map((ticket, i) => (
                    <ListItem
                      id={ticket.id}
                      index={i}
                      key={ticket.id}
                      name={ticket.title}
                      parent={status.id}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {ticket.id}
                          </span>
                          <span className={`text-[10px] ${priorityStyles[ticket.priority]}`}>
                            {ticket.priority}
                          </span>
                          {ticket.tag && (
                            <span className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                              {ticket.tag}
                            </span>
                          )}
                        </div>
                        <p className="m-0 text-sm leading-snug">{ticket.title}</p>
                      </div>
                    </ListItem>
                  ))
                )}
              </ListItems>
            </ListGroup>
          );
        })}
      </div>
    </ListProvider>
  );
}
