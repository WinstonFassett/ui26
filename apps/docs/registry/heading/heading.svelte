<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { heading, type HeadingVariants } from "./heading.tv";

  type Props = Omit<HTMLAttributes<HTMLHeadingElement>, "class"> &
    HeadingVariants & {
      class?: string;
      children?: Snippet;
    };

  let { level = "h2", class: className, children, ...rest }: Props = $props();
</script>

{#if level === "h1"}
  <h1 class={cn(heading({ level }), className)} {...rest}>{@render children?.()}</h1>
{:else if level === "h3"}
  <h3 class={cn(heading({ level }), className)} {...rest}>{@render children?.()}</h3>
{:else if level === "h4"}
  <h4 class={cn(heading({ level }), className)} {...rest}>{@render children?.()}</h4>
{:else}
  <h2 class={cn(heading({ level }), className)} {...rest}>{@render children?.()}</h2>
{/if}
