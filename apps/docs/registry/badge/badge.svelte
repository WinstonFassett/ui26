<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { badge, type BadgeVariants } from "./badge.tv";

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, "class"> &
    BadgeVariants & {
      class?: string;
      children?: Snippet;
    };

  let {
    variant,
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<span class={cn(badge({ variant }), className)} {...rest}>
  {@render children?.()}
</span>
