<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../_shared/lib/cn";
  import { cardTitle } from "./Card.tv";

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<div class={cn(cardTitle(), className)} {...rest}>
  {@render children?.()}
</div>
