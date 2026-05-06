<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { breadcrumb } from "./breadcrumb.tv";

  type Props = Omit<HTMLAttributes<HTMLElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<nav aria-label="breadcrumb" class={cn(breadcrumb(), className)} {...rest}>
  {@render children?.()}
</nav>
