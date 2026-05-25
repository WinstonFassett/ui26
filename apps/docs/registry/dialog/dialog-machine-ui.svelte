<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { button } from "../button/button.tv";
  import { dialogContent, dialogTitle, dialogDescription } from "./dialog.tv";
  import {
    createDialogMachine,
    bindDialogEffects,
    getSlotProps,
    isClosing as isClosingHelper,
    type DialogChangeEvent,
    type DialogSnapshot,
  } from "./dialog-machine.vanilla";
  import {
    createFocusSaver,
    createFocusTrap,
    createScrollLock,
    createBackgroundHider,
  } from "../lib/dom-behaviors";

  type Props = {
    /** Bindable controlled state. Use `bind:open` to control externally. */
    open?: boolean;
    /** Initial open state in uncontrolled mode. */
    defaultOpen?: boolean;
    class?: string;
    triggerLabel?: string;
    title?: string;
    description?: string;
    children?: Snippet;
    watchId?: string;
    loadContent?: () => Promise<void>;
  };

  let {
    open = $bindable<boolean | undefined>(undefined),
    defaultOpen = false,
    class: className,
    triggerLabel = "Open dialog",
    title = "Dialog",
    description,
    children,
    watchId,
    loadContent,
  }: Props = $props();

  const isControlled = open !== undefined;
  const initialKey: "Open" | "Closed" = (isControlled ? open : defaultOpen) ? "Open" : "Closed";

  let triggerEl: HTMLButtonElement | null = $state(null);
  let panelEl: HTMLDivElement | null = $state(null);

  const titleId = `dialog-title-${Math.random().toString(36).slice(2)}`;
  const descId  = `dialog-desc-${Math.random().toString(36).slice(2)}`;

  const focusSaver = createFocusSaver();
  const focusTrap  = createFocusTrap(() => panelEl);
  const scrollLock = createScrollLock();
  const bgHider    = createBackgroundHider(() => panelEl);

  const machine = createDialogMachine(initialKey);

  let snap = $state<DialogSnapshot>(machine.getSnapshot());
  let lastEvent = $state<DialogChangeEvent | null>(null);
  machine.subscribe((ev) => { lastEvent = ev; snap = machine.getSnapshot(); });

  // Mirror controlled `open` prop into the machine.
  $effect(() => {
    if (!isControlled) return;
    const current = machine.getSnapshot().key;
    if (open && current === "Closed") machine.send("open");
    else if (!open && current === "Open") machine.send("close");
  });

  let loading = $state(false);

  function requestOpen() {
    if (isControlled) {
      open = true;
    } else {
      machine.send("open");
    }
  }
  function requestClose() {
    if (isControlled) {
      open = false;
    } else {
      machine.send("close");
    }
  }

  async function handleTriggerClick() {
    if (loadContent) {
      loading = true;
      await loadContent();
      loading = false;
    }
    requestOpen();
  }

  $effect(() => {
    if (!panelEl) return;

    const unsubEffects = bindDialogEffects(
      machine,
      {
        SaveFocus:      () => focusSaver.activate(),
        RestoreFocus:   () => focusSaver.deactivate(),
        LockScroll:     () => scrollLock.activate(),
        UnlockScroll:   () => scrollLock.deactivate(),
        HideBackground: () => bgHider.activate(),
        ShowBackground: () => bgHider.deactivate(),
        TrapFocus:      () => focusTrap.activate(),
        ReleaseFocus:   () => focusTrap.deactivate(),
        OpenDialog: () => {
          requestAnimationFrame(() => machine.send("settle"));
        },
        CloseDialog: () => {},
        AnimateClose: () => {
          const el = panelEl;
          if (!el) { machine.send("settle"); return; }
          const style = getComputedStyle(el);
          if (style.animationName === "none") { machine.send("settle"); return; }
          const onEnd = () => {
            machine.send("settle");
            el.removeEventListener("animationend", onEnd);
          };
          el.addEventListener("animationend", onEnd);
        },
      },
      { trigger: triggerEl, panel: panelEl },
    );

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape" && machine.getSnapshot().key === "Open") {
        e.preventDefault();
        requestClose();
      }
    }
    document.addEventListener("keydown", onKeydown);

    function onPointerDown(e: PointerEvent) {
      if (machine.getSnapshot().key !== "Open") return;
      if (panelEl?.contains(e.target as Node)) return;
      requestClose();
    }
    document.addEventListener("pointerdown", onPointerDown);

    let observer: MutationObserver | null = null;
    if (watchId) {
      observer = new MutationObserver(() => {
        const attr = document.body.getAttribute("data-dialog-open");
        if (attr === watchId) requestOpen();
        else if (machine.getSnapshot().key !== "Closed") requestClose();
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ["data-dialog-open"] });
    }

    return () => {
      unsubEffects?.();
      document.removeEventListener("keydown", onKeydown);
      document.removeEventListener("pointerdown", onPointerDown);
      observer?.disconnect();
    };
  });

  const triggerSlot = $derived(getSlotProps(snap.key, "trigger"));
  const isOpenState = $derived(snap.key === "Open");
  const closing     = $derived(isClosingHelper(lastEvent, snap));
  const isVisible   = $derived(isOpenState || closing);
</script>

{#if !watchId}
  <button
    bind:this={triggerEl}
    type="button"
    disabled={loading}
    aria-haspopup="dialog"
    aria-controls={titleId}
    class={button({ variant: "secondary", size: "lg" })}
    onclick={handleTriggerClick}
    {...triggerSlot}
  >
    {loading ? "Loading…" : triggerLabel}
  </button>
{/if}

{#if isVisible}
  <div
    aria-hidden="true"
    data-state={closing ? "closed" : "open"}
    class="fixed inset-0 z-50 bg-black/50 supports-backdrop-filter:backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
  ></div>
{/if}

{#if isVisible}
  <div
    bind:this={panelEl}
    id={titleId}
    role="dialog"
    aria-modal="true"
    aria-labelledby="{titleId}-heading"
    aria-describedby={description ? descId : undefined}
    data-state={closing ? "closed" : "open"}
    class={cn(
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 sm:max-w-lg",
      "rounded-lg border border-border bg-background p-6 shadow-lg outline-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "duration-200",
      className,
    )}
  >
    <div class="flex flex-col gap-2 pr-8">
      <h2 id="{titleId}-heading" class={dialogTitle()}>{title}</h2>
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
      <button type="button" class={button({ variant: "secondary" })} onclick={requestClose}>
        Close
      </button>
    </div>

    <button
      type="button"
      class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label="Close"
      onclick={requestClose}
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"/>
      </svg>
    </button>
  </div>
{/if}
