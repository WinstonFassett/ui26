<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";
  import { button, type ButtonVariants } from "./button.tv";

  type Props = Omit<HTMLButtonAttributes, "size" | "class"> &
    ButtonVariants & {
      class?: string;
      children?: Snippet;
    };

  let {
    variant,
    size,
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<button class={cn(button({ variant, size }), className)} {...rest}>
  {@render children?.()}
</button>
