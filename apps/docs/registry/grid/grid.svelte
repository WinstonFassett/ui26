<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { grid, type GridVariants } from "./grid.tv";

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> &
    GridVariants & {
      class?: string;
      children?: Snippet;
    };

  let { cols, gap, class: className, children, ...rest }: Props = $props();
</script>

<div class={cn(grid({ cols, gap }), className)} {...rest}>
  {@render children?.()}
</div>
