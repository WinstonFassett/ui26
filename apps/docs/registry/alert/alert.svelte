<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { alert, type AlertVariants } from "./alert.tv";

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> &
    AlertVariants & {
      class?: string;
      children?: Snippet;
    };

  let { variant, class: className, children, ...rest }: Props = $props();
</script>

<div role="alert" class={cn(alert({ variant }), className)} {...rest}>
  {@render children?.()}
</div>
