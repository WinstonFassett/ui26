import React from "react";
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogFooter,
  DialogTitle, DialogDescription, DialogClose,
  useDialogBodyAttr,
} from "./dialog";

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
          <button className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Save changes
          </button>
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

// Simulates fetching content before opening — e.g. a user record, async form data
export function DialogDynamicDemo() {
  const [data, setData] = React.useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = React.useState(false);
  const machineRef = React.useRef<import("./dialog.state").DialogMachine | null>(null);

  async function handleClick() {
    setLoading(true);
    setData(null);
    await new Promise((r) => setTimeout(r, 800));
    setData({ name: "Ada Lovelace", email: "ada@example.com" });
    setLoading(false);
    machineRef.current?.send("open");
  }

  return (
    <Dialog machineRef={machineRef}>
      <button
        disabled={loading}
        className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-muted disabled:opacity-50"
        onClick={handleClick}
      >
        {loading ? "Loading…" : "Load & open"}
      </button>
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

export function DialogDistantDemo() {
  return (
    <div className="flex flex-col gap-3">
      <button
        className="inline-flex h-9 w-fit items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
        onClick={() => document.body.setAttribute("data-dialog-open", "profile")}
      >
        Distant trigger
      </button>
      <Dialog>
        <DistantDialogListener />
      </Dialog>
    </div>
  );
}
