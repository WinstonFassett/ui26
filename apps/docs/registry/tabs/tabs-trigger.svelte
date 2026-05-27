<script lang="ts">
  import type { Snippet } from "svelte";
  import { getContext, untrack } from "svelte";
  import { cn } from "../lib/utils";
  import { tabsTrigger } from "./tabs.tv";
  import { getSlotProps, type TabsState } from "./tabs-machine.vanilla";

  type Props = {
    value: string;
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  };

  let { value, class: className, children, ...rest }: Props = $props();

  const ctx = getContext<{
    state: { get(): TabsState };
    store: { subscribe(fn: (v: TabsState) => void): () => void };
    activateTab: (v: string) => void;
  } | undefined>("tabs");

  const initial: TabsState = ctx ? ctx.state.get() : untrack(() => ({ activeTab: value }));
  let state = $state(initial);
  $effect(() => {
    if (!ctx) return;
    return ctx.store.subscribe((s) => { state = s; });
  });

  const slotProps = $derived(getSlotProps(state, "trigger", value));
</script>

<button
  role="tab"
  type="button"
  class={cn(tabsTrigger(), className)}
  onclick={() => ctx?.activateTab(value)}
  {...slotProps}
  {...rest}
>
  {@render children?.()}
</button>
