<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { dialogContent, dialogTitle, dialogDescription } from "./dialog.tv";
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

  let dialogEl: HTMLDialogElement | null = $state(null);

  const machine = createDialogMachine();
  const machineStore = withSubscribe(machine);

  let stateKey = $state("Closed");
  machineStore.subscribe((ev: any) => { if (ev?.to?.key) stateKey = ev.to.key; });

  $effect(() => {
    if (machine.getState().key !== "Closed") machine.send("reset" as any);

    const unsubEffects = bindDialogEffects(machine, {
      OpenDialog: () => {
        dialogEl?.showModal();
        machine.send("ready");
      },
      CloseDialog: () => {
        // AnimateClose will call done — don't close native dialog yet
      },
      AnimateClose: () => {
        const el = dialogEl;
        if (!el) { machine.send("done"); return; }
        const style = getComputedStyle(el);
        if (style.animationName === "none") {
          el.close();
          machine.send("done");
          return;
        }
        const onEnd = () => {
          el.close();
          machine.send("done");
          el.removeEventListener("animationend", onEnd);
        };
        el.addEventListener("animationend", onEnd);
      },
    });

    // Native dialog cancel event (Escape key)
    const onCancel = (e: Event) => {
      e.preventDefault();
      machine.send("close");
    };
    dialogEl?.addEventListener("cancel", onCancel);

    // Distant trigger: watch body attribute
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
      dialogEl?.removeEventListener("cancel", onCancel);
      observer?.disconnect();
    };
  });

  const isOpen = $derived(stateKey === "Open" || stateKey === "Opening");
  const isClosing = $derived(stateKey === "Closing");

  function closeOnBackdrop(e: MouseEvent) {
    if (e.target === dialogEl) machine.send("close");
  }
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

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialogEl}
  data-state={isClosing ? "closed" : "open"}
  class={cn(
    "m-auto w-full max-w-lg rounded-lg border border-border bg-background p-6 shadow-lg outline-none backdrop:bg-black/50",
    "open:animate-in animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    className
  )}
  onclick={closeOnBackdrop}
>
  <h2 class={dialogTitle()}>{title}</h2>
  {#if description}
    <p class={cn(dialogDescription(), "mt-2")}>{description}</p>
  {/if}

  <div class="mt-4">
    {#if children}
      {@render children()}
    {:else}
      <p class="text-sm text-muted-foreground">Dialog content goes here.</p>
    {/if}
  </div>

  <div class="mt-6 flex justify-end gap-2">
    <button
      type="button"
      class="inline-flex h-8 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium hover:bg-muted"
      onclick={() => machine.send("close")}
    >
      Close
    </button>
  </div>
</dialog>
