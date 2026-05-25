<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";
  import { createTabsMachine } from "./tabs-machine.vanilla";

  type Props = {
    /** Bindable controlled value. Use `bind:value` to control externally. */
    value?: string;
    /** Uncontrolled initial value. */
    defaultValue?: string;
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  };

  let {
    value = $bindable<string | undefined>(undefined),
    defaultValue = "",
    class: className,
    children,
    ...rest
  }: Props = $props();

  const initial = value !== undefined ? value : defaultValue;
  const ctx = createTabsMachine(initial);

  // Mirror controlled `value` prop into atom on change.
  $effect(() => {
    if (value === undefined) return;
    if (ctx.state.get().activeTab !== value) {
      ctx.state.set({ activeTab: value });
    }
  });

  // Mirror atom changes back to bound `value` so `bind:value` works.
  $effect(() => {
    const unsub = ctx.state.subscribe((s) => {
      if (value !== undefined && value !== s.activeTab) {
        value = s.activeTab;
      } else if (value === undefined && value !== s.activeTab) {
        // uncontrolled — still update for any consumer reading bind:value
        value = s.activeTab;
      }
    });
    return unsub;
  });

  // Svelte store protocol bridge for children.
  const store = {
    subscribe(fn: (v: { activeTab: string }) => void) {
      fn(ctx.state.get());
      return ctx.state.subscribe(fn);
    },
  };

  setContext("tabs", { state: ctx.state, store, activateTab: ctx.activateTab });
</script>

<div class={["w-full", className].filter(Boolean).join(" ")} {...rest}>
  {@render children?.()}
</div>
