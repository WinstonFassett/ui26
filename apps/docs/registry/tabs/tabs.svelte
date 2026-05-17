<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";
  import { createTabsState } from "./tabs.state";

  type Props = {
    defaultValue: string;
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  };

  let { defaultValue, class: className, children, ...rest }: Props = $props();

  const ctx = createTabsState(defaultValue);

  const store = {
    subscribe(fn: (value: { activeTab: string }) => void) {
      fn(ctx.state.get());
      return ctx.state.subscribe(fn);
    },
  };

  setContext("tabs", { state: ctx.state, store, activateTab: ctx.activateTab });
</script>

<div class={["w-full", className].filter(Boolean).join(" ")} {...rest}>
  {@render children?.()}
</div>
