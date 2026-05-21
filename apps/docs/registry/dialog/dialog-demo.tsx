import React from "react";
import { Button } from "../button/button";
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogFooter,
  DialogTitle, DialogDescription, DialogClose,
  useDialogBodyAttr,
} from "./dialog";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild><Button variant="secondary">Open dialog</Button></DialogTrigger>
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
