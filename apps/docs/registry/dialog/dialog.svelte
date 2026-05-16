<script lang="ts">
  import type { Snippet } from "svelte";
  import { Dialog as DialogPrimitive } from "bits-ui";
  import { cn } from "../lib/utils";
  import { dialogTitle, dialogDescription } from "./dialog.tv";
  import { createDialogMachine, bindDialogEffects } from "./dialog.state";
  import { withSubscribe } from "matchina";

  type Props = {
    class?: string;
    triggerLabel?: string;
    title?: string;
    description?: string;
    children?: Snippet;
    /** If set, watches body[data-dialog-open] for this id — distant trigger mode */
    watchId?: string;
  };

  let {
    class: className,
    triggerLabel = "Open dialog",
    title = "Dialog",
    description,
    children,
    watchId,
  }: Props = $props();

  const machine = createDialogMachine();
  const machineStore = withSubscribe(machine);

  let stateKey = $state("Closed");
  machineStore.subscribe((ev: any) => { if (ev?.to?.key) stateKey = ev.to.key; });

  $effect(() => {
    if (machine.getState().key !== "Closed") machine.send("reset" as any);

    // bits-ui Dialog manages portal, focus trap, scroll lock, and data-open/data-closed
    // — machine just coordinates open/closing states
    const unsubEffects = bindDialogEffects(machine, {
      OpenDialog:   () => { requestAnimationFrame(() => machine.send("ready")); },
      CloseDialog:  () => {},
      AnimateClose: () => { setTimeout(() => machine.send("done"), 200); },
    });

    let observer: MutationObserver | null = null;
    if (watchId) {
      observer = new MutationObserver(() => {
        const attr = document.body.getAttribute("data-dialog-open");
        if (attr === watchId) machine.send("open");
        else if (machine.getState().key !== "Closed") machine.send("close");
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ["data-dialog-open"] });
    }

    return () => {
      unsubEffects?.();
      observer?.disconnect();
    };
  });

  const isOpen = $derived(stateKey === "Open" || stateKey === "Opening" || stateKey === "Closing");
</script>

{#if !watchId}
  <button
    type="button"
    class="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
    onclick={() => machine.send("open")}
  >
    {triggerLabel}
  </button>
{/if}

<DialogPrimitive.Root
  open={isOpen}
  onOpenChange={(open) => { if (!open && stateKey === "Open") machine.send("close"); }}
>
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
      class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
    />
    <DialogPrimitive.Content
      class={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 sm:max-w-lg",
        "rounded-lg border border-border bg-background p-6 shadow-lg outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        "duration-200",
        className
      )}
      onEscapeKeyDown={() => machine.send("close")}
      onInteractOutside={() => machine.send("close")}
    >
      <div class="flex flex-col gap-2 pr-8">
        <h2 class={dialogTitle()}>{title}</h2>
        {#if description}
          <p class={dialogDescription()}>{description}</p>
        {/if}
      </div>

      {#if children}
        {@render children()}
      {:else}
        <p class="text-sm text-muted-foreground">Dialog content goes here.</p>
      {/if}

      <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          class="inline-flex h-8 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium hover:bg-muted"
          onclick={() => machine.send("close")}
        >
          Close
        </button>
      </div>

      <DialogPrimitive.Close
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Close"
        onclick={() => machine.send("close")}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"/>
        </svg>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
</DialogPrimitive.Root>
