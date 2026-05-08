<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { stack, type StackVariants } from "./stack.tv";

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> &
    StackVariants & {
      class?: string;
      children?: Snippet;
    };

  let {
    direction,
    gap,
    align,
    justify,
    wrap,
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<div class={cn(stack({ direction, gap, align, justify, wrap }), className)} {...rest}>
  {@render children?.()}
</div>
