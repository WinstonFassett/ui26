<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { toggle, type ToggleVariants } from "./toggle.tv";

  type Props = Omit<HTMLButtonAttributes, "class"> &
    ToggleVariants & {
      class?: string;
      pressed?: boolean;
      children?: Snippet;
    };

  let { variant, size, pressed, class: className, children, ...rest }: Props = $props();
</script>

<button
  type="button"
  aria-pressed={pressed}
  class={cn(toggle({ variant, size }), className)}
  {...rest}
>
  {@render children?.()}
</button>
