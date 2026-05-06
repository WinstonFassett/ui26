<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { breadcrumbSeparator } from "./breadcrumb.tv";

  type Props = Omit<HTMLAttributes<HTMLLIElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<li role="presentation" aria-hidden="true" class={cn(breadcrumbSeparator(), className)} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  {/if}
</li>
