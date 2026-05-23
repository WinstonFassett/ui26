<script lang="ts">
  import type { Snippet } from "svelte";
  import { computePosition, flip, shift, offset, autoUpdate } from "@floating-ui/dom";
  import { cn } from "../lib/utils";
  import { button } from "../button/button.tv";
  import { popoverContent } from "./popover.tv";
  import { createPopoverMachine, bindPopoverEffects } from "./popover-machine.vanilla";

  type Props = {
    class?: string;
    triggerLabel?: string;
    children?: Snippet;
    sideOffset?: number;
  };

  let { class: className, triggerLabel = "Open popover", children, sideOffset = 4 }: Props = $props();

  const uid = Math.random().toString(36).slice(2, 8);
  const popoverId = `popover-${uid}`;
  const anchorName = `--popover-anchor-${uid}`;

  let triggerEl: HTMLButtonElement | null = $state(null);
  let floatingEl: HTMLDivElement | null = $state(null);
  let cleanupPositioner: (() => void) | null = null;

  const machine = createPopoverMachine();

  let stateKey = $state("Closed");
  machine.subscribe((ev: any) => { if (ev?.to?.key) stateKey = ev.to.key; });

  $effect(() => {
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
              floating.style.left = `${x}px`;
              floating.style.top = `${y}px`;
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

    // Click-outside close
    function onPointerDown(e: PointerEvent) {
      if (machine.getState().key !== "Open") return;
      const target = e.target as Node;
      if (!triggerEl?.contains(target) && !floatingEl?.contains(target)) {
        machine.send("close");
      }
    }
    document.addEventListener("pointerdown", onPointerDown);

    // Sync native popover toggle events back to machine (covers Escape + popovertarget clicks)
    function onToggle(e: ToggleEvent) {
      if (e.newState === "open" && machine.getState().key === "Closed") machine.send("open");
      if (e.newState === "closed" && machine.getState().key !== "Closed") machine.send("close");
    }
    floatingEl?.addEventListener("toggle", onToggle as EventListener);

    return () => {
      unsubEffects?.();
      cleanupPositioner?.();
      document.removeEventListener("pointerdown", onPointerDown);
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

<!--
  No-JS: popovertarget wires the button to the popover natively.
         CSS anchor positioning places it below the trigger.
  With JS: machine drives state, floating-ui positions it, click-outside listener added.
-->
<div style="position: relative;">
  <button
    bind:this={triggerEl}
    id={`${popoverId}-trigger`}
    type="button"
    popovertarget={popoverId}
    popovertargetaction="toggle"
    aria-haspopup="dialog"
    aria-expanded={isOpen}
    data-state={isOpen ? "open" : "closed"}
    style={`anchor-name: ${anchorName};`}
    class={button({ variant: "secondary" })}
    onclick={() => {
      // With JS: machine drives open/close; native popovertarget toggle is a no-op
      // (toggle event fires → machine receives "open"/"close" via onToggle listener)
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
    class={cn("fixed m-0", popoverContent(), className)}
    style={`position-anchor: ${anchorName}; top: anchor(bottom); left: anchor(left); margin-top: ${sideOffset}px;`}
  >
    {#if children}
      {@render children()}
    {:else}
      <p class="text-sm text-muted-foreground">This is a popover. It can contain any content.</p>
    {/if}
  </div>
</div>
