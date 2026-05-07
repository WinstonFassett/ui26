<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { paginationItem } from "./pagination.tv";

  type Props = Omit<HTMLAttributes<HTMLLIElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<li class={cn(paginationItem(), className)} {...rest}>
  {@render children?.()}
</li>
