<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { button } from "../button/button.tv";
  import { dialogContent, dialogTitle, dialogDescription } from "./dialog.tv";
  import { createDialogMachine, bindDialogEffects } from "./dialog-state.vanilla";
  import { createFocusSaver } from "../lib/dom-behaviors";

  type Props = {
    class?: string;
    triggerLabel?: string;
    title?: string;
    description?: string;
    children?: Snippet;
    /** If set, watches body[data-dialog-open] for this id — distant trigger mode */
    watchId?: string;
    /** If true, opens immediately on mount */
    defaultOpen?: boolean;
    /** If set, called on trigger click before opening — dialog waits for resolution */
    loadContent?: () => Promise<void>;
  };

  let {
    class: className,
    triggerLabel = "Open dialog",
    title = "Dialog",
    description,
    children,
    watchId,
    defaultOpen = false,
    loadContent,
  }: Props = $props();

  let triggerEl: HTMLButtonElement | null = $state(null);
  let dialogEl: HTMLDialogElement | null = $state(null);

  const titleId = `dialog-title-${Math.random().toString(36).slice(2)}`;
  const descId  = `dialog-desc-${Math.random().toString(36).slice(2)}`;

  const focusSaver = createFocusSaver();
  const machine = createDialogMachine();

  let stateKey = $state("Closed");
  machine.subscribe((ev) => { if (ev?.to?.key) stateKey = ev.to.key; });

  let loading = $state(false);

  async function handleOpen() {
    if (loadContent) {
      loading = true;
      await loadContent();
      loading = false;
    }
    machine.send("open");
  }

  $effect(() => {
    if (!dialogEl) return;

    // Read existing DOM state — don't stomp if already open (e.g. SSR defaultOpen)
    const initiallyOpen = dialogEl.open || defaultOpen;
    if (initiallyOpen) {
      dialogEl.showModal();
      machine.send("open");
      machine.send("ready");
    }

    const unsubEffects = bindDialogEffects(machine, {
      SaveFocus:   () => focusSaver.activate(),
      RestoreFocus: () => focusSaver.deactivate(),
      OpenDialog: () => {
        dialogEl?.showModal();
        requestAnimationFrame(() => machine.send("ready"));
      },
      CloseDialog: () => {
        dialogEl?.close();
      },
      AnimateClose: () => {
        const el = dialogEl;
        if (!el) { machine.send("done"); return; }
        const style = getComputedStyle(el);
        if (style.animationName === "none") { machine.send("done"); return; }
        const onEnd = () => {
          machine.send("done");
          el.removeEventListener("animationend", onEnd);
        };
        el.addEventListener("animationend", onEnd);
      },
    }, { trigger: triggerEl, panel: dialogEl });

    // Native close event — Escape key or programmatic close
    function onNativeClose() {
      if (machine.getState().key === "Open") machine.send("close");
    }
    dialogEl.addEventListener("close", onNativeClose);

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
      dialogEl?.removeEventListener("close", onNativeClose);
      observer?.disconnect();
    };
  });

  const isClosing = $derived(stateKey === "Closing");
  const isOpen = $derived(stateKey === "Open" || stateKey === "Opening" || stateKey === "Closing");
</script>

{#if !watchId}
  <button bind:this={triggerEl} type="button" disabled={loading} aria-haspopup="dialog" aria-controls={titleId} class={button({ variant: "secondary", size: "lg" })} onclick={handleOpen}>
    {loading ? "Loading…" : triggerLabel}
  </button>
{/if}

<dialog
  bind:this={dialogEl}
  aria-labelledby={titleId}
  aria-describedby={description ? descId : undefined}
  data-state={isClosing ? "closed" : isOpen ? "open" : "closed"}
  class={cn(dialogContent(), "not-open:hidden backdrop:bg-black/50 backdrop:supports-backdrop-filter:backdrop-blur-sm", className)}
  onkeydown={(e) => { if (e.key === "Escape") { e.preventDefault(); machine.send("close"); } }}
>
  <div class="flex flex-col gap-2 pr-8">
    <h2 id={titleId} class={dialogTitle()}>{title}</h2>
    {#if description}
      <p id={descId} class={dialogDescription()}>{description}</p>
    {/if}
  </div>

  {#if children}
    {@render children()}
  {:else}
    <p class="text-sm text-muted-foreground">Dialog content goes here.</p>
  {/if}

  <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
    <button type="button" class={button({ variant: "secondary" })} onclick={() => machine.send("close")}>
      Close
    </button>
  </div>

  <button
    type="button"
    class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    aria-label="Close"
    onclick={() => machine.send("close")}
  >
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"/>
    </svg>
  </button>
</dialog>
