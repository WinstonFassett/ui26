<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { paginationLink } from "./pagination.tv";

  type Props = Omit<HTMLAnchorAttributes, "class"> & {
    class?: string;
    isActive?: boolean;
    children?: Snippet;
  };

  let { isActive, class: className, children, ...rest }: Props = $props();
</script>

<a
  aria-current={isActive ? "page" : undefined}
  class={cn(paginationLink({ isActive }), className)}
  {...rest}
>
  {@render children?.()}
</a>
