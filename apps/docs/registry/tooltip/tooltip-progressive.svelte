<script lang="ts">
  import type { Snippet } from "svelte";
  import { computePosition, flip, shift, offset, autoUpdate } from "@floating-ui/dom";
  import { cn } from "../lib/utils";
  import { button } from "../button/button.tv";
  import { tooltipContent } from "./tooltip.tv";
  import { createTooltipMachine, bindTooltipEffects } from "./tooltip-machine.vanilla";

  type Props = {
    class?: string;
    label?: string;
    tip?: string;
    children?: Snippet;
    openDelay?: number;
    closeDelay?: number;
    sideOffset?: number;
  };

  let {
    class: className,
    label = "Hover me",
    tip = "Tooltip content",
    children,
    openDelay = 600,
    closeDelay = 300,
    sideOffset = 4,
  }: Props = $props();

  const uid = Math.random().toString(36).slice(2, 8);
  const tooltipId = `tooltip-${uid}`;
  const anchorName = `--tooltip-anchor-${uid}`;

  let triggerEl: HTMLButtonElement | null = $state(null);
  let floatingEl: HTMLDivElement | null = $state(null);
  let cleanupPositioner: (() => void) | null = null;

  const supportsAnchor = typeof CSS !== "undefined" && CSS.supports("anchor-name", "--x");

  const machine = createTooltipMachine(openDelay, closeDelay);

  let stateKey = $state("Closed");
  machine.subscribe((ev: any) => { if (ev?.to?.key) stateKey = ev.to.key; });

  $effect(() => {
    if (machine.getState().key !== "Closed") machine.send("reset" as any);

    const unsubEffects = bindTooltipEffects(machine, {
      StartOpenDelay: () => {
        const id = setTimeout(() => machine.send("open"), openDelay);
        return () => clearTimeout(id);
      },
      StartCloseDelay: () => {
        const id = setTimeout(() => machine.send("close"), closeDelay);
        return () => clearTimeout(id);
      },
      StartPositioner: () => {
        requestAnimationFrame(() => {
          const trigger = triggerEl;
          const floating = floatingEl;
          if (!trigger || !floating) { machine.send("ready"); return; }

          if (supportsAnchor) {
            machine.send("ready");
            return;
          }

          const update = () =>
            computePosition(trigger, floating, {
              placement: "top",
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

    return () => {
      unsubEffects?.();
      cleanupPositioner?.();
    };
  });

  // Drive native popover from machine state
  $effect(() => {
    const floating = floatingEl;
    if (!floating) return;
    if ((stateKey === "Open" || stateKey === "Opening" || stateKey === "CloseDelay") && !floating.matches(":popover-open")) {
      floating.showPopover?.();
    }
    if (stateKey === "Closed" && floating.matches(":popover-open")) {
      floating.hidePopover?.();
    }
  });

  const isVisible = $derived(stateKey === "Open" || stateKey === "Opening" || stateKey === "CloseDelay");
  const isClosing = $derived(stateKey === "Closing");
</script>

<div class="relative inline-block">
  <button
    bind:this={triggerEl}
    type="button"
    aria-describedby={tooltipId}
    style={supportsAnchor ? `anchor-name: ${anchorName};` : undefined}
    class={button({ variant: "secondary" })}
    onmouseenter={() => machine.send("enter")}
    onmouseleave={() => machine.send("leave")}
    onfocus={() => machine.send("enter")}
    onblur={() => machine.send("leave")}
  >
    {label}
  </button>

  <div
    bind:this={floatingEl}
    id={tooltipId}
    popover="hint"
    role="tooltip"
    data-state={isClosing ? "closed" : "open"}
    hidden={!isVisible && !isClosing}
    class={cn(
      supportsAnchor ? "fixed m-0" : "absolute",
      tooltipContent(),
      className
    )}
    style={supportsAnchor
      ? `position-anchor: ${anchorName}; inset-area: block-start span-inline-end; position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;`
      : "left: var(--x); top: var(--y);"}
  >
    {#if children}
      {@render children()}
    {:else}
      {tip}
    {/if}
  </div>
</div>
