<script lang="ts">
  import type { Snippet } from "svelte";
  import { computePosition, flip, shift, offset, autoUpdate } from "@floating-ui/dom";
  import { cn } from "../lib/utils";
  import { popoverContent } from "./popover.tv";
  import { createPopoverMachine, bindPopoverEffects } from "./popover.state";
  import { withSubscribe } from "matchina";

  type Props = {
    class?: string;
    triggerLabel?: string;
    children?: Snippet;
    sideOffset?: number;
  };

  let { class: className, triggerLabel = "Open popover", children, sideOffset = 4 }: Props = $props();

  // Stable ID for popovertarget wiring
  const uid = Math.random().toString(36).slice(2, 8);
  const popoverId = `popover-${uid}`;
  const anchorName = `--popover-anchor-${uid}`;

  let triggerEl: HTMLButtonElement | null = $state(null);
  let floatingEl: HTMLDivElement | null = $state(null);
  let cleanupPositioner: (() => void) | null = null;

  // Detect CSS anchor positioning support once
  const supportsAnchor = typeof CSS !== "undefined" && CSS.supports("anchor-name", "--x");

  const machine = createPopoverMachine();
  const machineStore = withSubscribe(machine);

  let stateKey = $state("Closed");
  machineStore.subscribe((ev: any) => { if (ev?.to?.key) stateKey = ev.to.key; });

  $effect(() => {
    if (machine.getState().key !== "Closed") machine.send("reset" as any);

    const unsubEffects = bindPopoverEffects(machine, {
      StartPositioner: () => {
        requestAnimationFrame(() => {
          const trigger = triggerEl;
          const floating = floatingEl;
          if (!trigger || !floating) { machine.send("ready"); return; }

          if (supportsAnchor) {
            // CSS anchor positioning handles layout — no JS needed
            machine.send("ready");
            return;
          }

          const update = () =>
            computePosition(trigger, floating, {
              placement: "bottom",
              middleware: [offset(sideOffset), flip(), shift({ padding: 8 })],
            }).then(({ x, y, placement }) => {
              floating.style.setProperty("--x", `${x}px`);
              floating.style.setProperty("--y", `${y}px`);
              floating.dataset.side = placement.split("-")[0];
              if (machine.getState().key === "Opening") machine.send("ready");
            });

          cleanupPositioner = autoUpdate(trigger, floating, update);
        });
      },
      StopPositioner: () => {
        cleanupPositioner?.();
        cleanupPositioner = null;
      },
      AnimateClose: () => {
        const floating = floatingEl;
        if (!floating) { machine.send("done"); return; }
        const style = getComputedStyle(floating);
        if (style.animationName === "none") { machine.send("done"); return; }
        const onEnd = () => {
          machine.send("done");
          floating.removeEventListener("animationend", onEnd);
        };
        floating.addEventListener("animationend", onEnd);
      },
    });

    // Sync native popover events back to machine
    function onToggle(e: ToggleEvent) {
      if (e.newState === "open" && machine.getState().key === "Closed") machine.send("open");
      if (e.newState === "closed" && machine.getState().key !== "Closed") machine.send("close");
    }
    floatingEl?.addEventListener("toggle", onToggle as EventListener);

    return () => {
      unsubEffects?.();
      cleanupPositioner?.();
      floatingEl?.removeEventListener("toggle", onToggle as EventListener);
    };
  });

  // Drive native popover from machine state
  $effect(() => {
    const floating = floatingEl;
    if (!floating) return;
    if ((stateKey === "Open" || stateKey === "Opening") && !floating.matches(":popover-open")) {
      floating.showPopover?.();
    }
    if (stateKey === "Closed" && floating.matches(":popover-open")) {
      floating.hidePopover?.();
    }
  });

  const isOpen = $derived(stateKey === "Open" || stateKey === "Opening");
  const isClosing = $derived(stateKey === "Closing");
</script>

<div class="relative inline-block">
  <button
    bind:this={triggerEl}
    id={`${popoverId}-trigger`}
    type="button"
    popovertarget={popoverId}
    popovertargetaction="toggle"
    aria-haspopup="dialog"
    aria-expanded={isOpen}
    data-state={isOpen ? "open" : "closed"}
    style={supportsAnchor ? `anchor-name: ${anchorName};` : undefined}
    class="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium hover:bg-muted"
    onclick={() => {
      // native popovertarget handles DOM toggle; machine follows via toggle event
    }}
  >
    {triggerLabel}
  </button>

  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    bind:this={floatingEl}
    id={popoverId}
    popover="manual"
    role="dialog"
    data-state={isClosing ? "closed" : "open"}
    hidden={!isOpen && !isClosing}
    class={cn(
      supportsAnchor ? "fixed m-0" : "absolute",
      popoverContent(),
      className
    )}
    style={supportsAnchor
      ? `position-anchor: ${anchorName}; inset-area: block-end span-inline-end; position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;`
      : "left: var(--x); top: var(--y);"}
  >
    {#if children}
      {@render children()}
    {:else}
      <p class="text-sm text-muted-foreground">This is a popover. It can contain any content.</p>
    {/if}
  </div>
</div>
