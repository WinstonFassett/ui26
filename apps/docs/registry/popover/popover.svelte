<script lang="ts">
  import type { Snippet } from "svelte";
  import { computePosition, flip, shift, offset, autoUpdate } from "@floating-ui/dom";
  import { cn } from "../lib/utils";
  import { button } from "../button/button.tv";
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

  let triggerEl: HTMLButtonElement | null = $state(null);
  let floatingEl: HTMLDivElement | null = $state(null);
  let cleanupPositioner: (() => void) | null = null;

  const machine = createPopoverMachine();
  const machineStore = withSubscribe(machine);

  // Svelte store protocol: subscribe emits the change event, we read key from it
  let stateKey = $state("Closed");
  machineStore.subscribe((ev: any) => { if (ev?.to?.key) stateKey = ev.to.key; });

  $effect(() => {
    // Reset on HMR rebind — machine may be in a stale state
    if (machine.getState().key !== "Closed") machine.send("reset" as any);

    const unsubEffects = bindPopoverEffects(machine, {
      StartPositioner: () => {
        requestAnimationFrame(() => {
        const trigger = triggerEl;
        const floating = floatingEl;
        if (!trigger || !floating) { machine.send("ready"); return; }

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
        }); // end rAF
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

  const isOpen = $derived(stateKey === "Open" || stateKey === "Opening");
  const isClosing = $derived(stateKey === "Closing");
</script>

<div class="relative inline-block">
  <button
    bind:this={triggerEl}
    type="button"
    aria-haspopup="dialog"
    aria-expanded={isOpen}
    data-state={isOpen ? "open" : "closed"}
    class={button({ variant: "secondary" })}
    onclick={() => isOpen ? machine.send("close") : machine.send("open")}
  >
    {triggerLabel}
  </button>

  <div
    bind:this={floatingEl}
    role="dialog"
    data-state={isClosing ? "closed" : "open"}
    hidden={!isOpen && !isClosing}
    class={cn("absolute", popoverContent(), className)}
    style="left: var(--x); top: var(--y);"
  >
    {#if children}
      {@render children()}
    {:else}
      <p class="text-sm text-muted-foreground">This is a popover. It can contain any content.</p>
    {/if}
  </div>
</div>
