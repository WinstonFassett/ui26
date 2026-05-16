<script lang="ts">
  import type { Snippet } from "svelte";
  import { getContext, untrack } from "svelte";
  import { cn } from "../lib/utils";
  import { tabsTrigger } from "./tabs.tv";

  type Props = {
    value: string;
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  };

  let { value, class: className, children, ...rest }: Props = $props();

  const ctx = getContext<{
    state: { get(): { activeTab: string } };
    store: { subscribe(fn: (v: { activeTab: string }) => void): () => void };
    activateTab: (v: string) => void;
  } | undefined>("tabs");

  const initial = ctx ? ctx.state.get().activeTab : untrack(() => value);
  let activeTab = $state(initial);
  $effect(() => {
    if (!ctx) return;
    const unsub = ctx.store.subscribe((s) => { activeTab = s.activeTab; });
    return unsub;
  });

  const isActive = $derived(activeTab === value);

</script>

<button
  role="tab"
  type="button"
  aria-selected={isActive}
  data-state={isActive ? "active" : "inactive"}
  class={cn(tabsTrigger(), className)}
  onclick={() => ctx?.activateTab(value)}
  {...rest}
>
  {@render children?.()}
</button>
