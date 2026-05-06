<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { alertTitle } from "./alert.tv";

  type Props = Omit<HTMLAttributes<HTMLHeadingElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<h5 class={cn(alertTitle(), className)} {...rest}>
  {@render children?.()}
</h5>
