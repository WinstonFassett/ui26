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
