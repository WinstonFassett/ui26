<script lang="ts">
  import type { Snippet } from "svelte";
  import { computePosition, flip, shift, offset, autoUpdate } from "@floating-ui/dom";
  import { cn } from "../lib/utils";
  import { button } from "../button/button.tv";
  import { tooltipContent } from "./tooltip.tv";
  import { createTooltipMachine, bindTooltipEffects } from "./tooltip-state.vanilla";

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

  let triggerEl: HTMLButtonElement | null = $state(null);
  let floatingEl: HTMLDivElement | null = $state(null);
  let cleanupPositioner: (() => void) | null = null;

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

  const isVisible = $derived(stateKey === "Open" || stateKey === "Opening" || stateKey === "CloseDelay");
  const isClosing = $derived(stateKey === "Closing");
</script>

<div class="relative inline-block">
  <button
    bind:this={triggerEl}
    type="button"
    aria-describedby="tooltip-svelte"
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
    role="tooltip"
    id="tooltip-svelte"
    data-state={isClosing ? "closed" : "open"}
    hidden={!isVisible && !isClosing}
    class={cn("absolute", tooltipContent(), className)}
    style="left: var(--x); top: var(--y);"
  >
    {#if children}
      {@render children()}
    {:else}
      {tip}
    {/if}
  </div>
</div>
