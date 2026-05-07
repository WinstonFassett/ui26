<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { pagination } from "./pagination.tv";

  type Props = Omit<HTMLAttributes<HTMLElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<nav role="navigation" aria-label="pagination" class={cn(pagination(), className)} {...rest}>
  {@render children?.()}
</nav>
