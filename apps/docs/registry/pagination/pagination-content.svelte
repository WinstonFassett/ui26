<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { paginationContent } from "./pagination.tv";

  type Props = Omit<HTMLAttributes<HTMLUListElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<ul class={cn(paginationContent(), className)} {...rest}>
  {@render children?.()}
</ul>
