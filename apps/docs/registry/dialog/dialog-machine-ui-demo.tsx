import React from "react";
import { Button } from "../button/button";
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogFooter,
  DialogTitle, DialogDescription, DialogClose,
  useDialogBodyAttr,
} from "./dialog-machine-ui";

// Uncontrolled — `defaultOpen` initializes; prop API only.
export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Controlled — parent owns `open`; prop API only, no machine import.
export function DialogControlledDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => setOpen(true)}>Open from outside</Button>
        <Button variant="ghost" onClick={() => setOpen(false)} disabled={!open}>Close from outside</Button>
      </div>
      <p className="text-sm text-muted-foreground">External state: {open ? "open" : "closed"}</p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled dialog</DialogTitle>
            <DialogDescription>
              Parent component owns the open state. Closing inside still fires onOpenChange.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Default-open — uncontrolled, but starts in Open state. SSR markup is already open.
export function DialogDefaultOpenDemo() {
  return (
    <Dialog defaultOpen>
      <DialogTrigger>Reopen</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Open on mount</DialogTitle>
          <DialogDescription>
            `defaultOpen` passes "Open" as positional `initial` to the factory — no hydration flash.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Got it</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DistantDialogListener() {
  useDialogBodyAttr("profile");
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Remotely opened</DialogTitle>
        <DialogDescription>
          This dialog was opened by a trigger outside the component tree.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose onClick={() => document.body.removeAttribute("data-dialog-open")}>
          Close
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

export function DialogDistantDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="secondary"
        size="lg"
        onClick={() => document.body.setAttribute("data-dialog-open", "profile")}
      >
        Distant trigger
      </Button>
      <Dialog>
        <DistantDialogListener />
      </Dialog>
    </div>
  );
}

// Dynamic content — fetch then open via controlled `open` prop. Prop API only.
export function DialogDynamicDemo() {
  const [data, setData] = React.useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  async function handleClick() {
    setLoading(true);
    setData(null);
    await new Promise((r) => setTimeout(r, 800));
    setData({ name: "Ada Lovelace", email: "ada@example.com" });
    setLoading(false);
    setOpen(true);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="secondary" size="lg" disabled={loading} onClick={handleClick}>
        {loading ? "Loading…" : "Load & open"}
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User record</DialogTitle>
          <DialogDescription>Fetched before the dialog opened.</DialogDescription>
        </DialogHeader>
        {data && (
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="text-muted-foreground">Name</dt><dd>{data.name}</dd>
            <dt className="text-muted-foreground">Email</dt><dd>{data.email}</dd>
          </dl>
        )}
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
