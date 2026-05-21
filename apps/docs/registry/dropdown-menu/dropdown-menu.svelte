<script lang="ts">
  import type { Snippet } from "svelte";
  import { computePosition, flip, shift, offset, autoUpdate } from "@floating-ui/dom";
  import { cn } from "../lib/utils";
  import { button } from "../button/button.tv";
  import { dropdownContent, dropdownItem, dropdownSeparator, dropdownLabel } from "./dropdown-menu.tv";
  import { createDropdownMachine, bindDropdownEffects } from "./dropdown-menu-state.vanilla";

  type Item = { label: string; onSelect?: () => void; disabled?: boolean };
  type Section = { heading?: string; items: Item[] };

  type Props = {
    class?: string;
    triggerLabel?: string;
    sections?: Section[];
    children?: Snippet;
    sideOffset?: number;
  };

  let {
    class: className,
    triggerLabel = "Open menu",
    sections = [{ items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }] }],
    children,
    sideOffset = 4,
  }: Props = $props();

  let triggerEl: HTMLButtonElement | null = $state(null);
  let floatingEl: HTMLDivElement | null = $state(null);
  let cleanupPositioner: (() => void) | null = null;

  const machine = createDropdownMachine();

  let stateKey = $state("Closed");
  machine.subscribe((ev: any) => { if (ev?.to?.key) stateKey = ev.to.key; });

  $effect(() => {
    if (machine.getState().key !== "Closed") machine.send("reset" as any);

    const unsubEffects = bindDropdownEffects(machine, {
      StartPositioner: () => {
        requestAnimationFrame(() => {
          const trigger = triggerEl;
          const floating = floatingEl;
          if (!trigger || !floating) { machine.send("ready"); return; }

          const update = () =>
            computePosition(trigger, floating, {
              placement: "bottom-start",
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

    // Close on outside click
    const handleClick = (e: MouseEvent) => {
      const key = machine.getState().key;
      if (key !== "Open" && key !== "Opening") return;
      if (triggerEl?.contains(e.target as Node) || floatingEl?.contains(e.target as Node)) return;
      machine.send("close");
    };
    document.addEventListener("mousedown", handleClick);

    return () => {
      unsubEffects?.();
      cleanupPositioner?.();
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const isOpen = $derived(stateKey === "Open" || stateKey === "Opening");
  const isClosing = $derived(stateKey === "Closing");
</script>

<div class="relative inline-block">
  <button
    bind:this={triggerEl}
    type="button"
    aria-haspopup="menu"
    aria-expanded={isOpen}
    data-state={isOpen ? "open" : "closed"}
    class={button({ variant: "secondary" })}
    onclick={() => isOpen ? machine.send("close") : machine.send("open")}
  >
    {triggerLabel}
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>

  <div
    bind:this={floatingEl}
    role="menu"
    data-state={isClosing ? "closed" : "open"}
    hidden={!isOpen && !isClosing}
    class={cn("absolute", dropdownContent(), className)}
    style="left: var(--x); top: var(--y);"
  >
    {#each sections as section, i}
      {#if i > 0}
        <div role="separator" class={dropdownSeparator()} />
      {/if}
      {#if section.heading}
        <div class={dropdownLabel()}>{section.heading}</div>
      {/if}
      {#each section.items as item}
        <div
          role="menuitem"
          data-disabled={item.disabled || undefined}
          class={dropdownItem()}
          onclick={() => {
            if (item.disabled) return;
            item.onSelect?.();
            machine.send("close");
          }}
        >
          {item.label}
        </div>
      {/each}
    {/each}
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
