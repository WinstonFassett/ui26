import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, useDialogBodyAttr } from "./dialog";

// ---------------------------------------------------------------------------
// Co-located: trigger and dialog together
// ---------------------------------------------------------------------------

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription className="mt-2">
          Make changes to your profile here. Click save when done.
        </DialogDescription>
        <div className="mt-6 flex justify-end gap-2">
          <DialogClose>Cancel</DialogClose>
          <button className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Save changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Distant trigger: trigger lives elsewhere, dialog watches body attr
// ---------------------------------------------------------------------------

function DistantDialogListener() {
  useDialogBodyAttr("profile");
  return (
    <DialogContent>
      <DialogTitle>Remotely opened</DialogTitle>
      <DialogDescription className="mt-2">
        This dialog was opened by a trigger outside the component tree.
      </DialogDescription>
      <div className="mt-6 flex justify-end">
        <DialogClose onClick={() => document.body.removeAttribute("data-dialog-open")}>
          Close
        </DialogClose>
      </div>
    </DialogContent>
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
