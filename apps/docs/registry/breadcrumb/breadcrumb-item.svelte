<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { breadcrumbItem } from "./breadcrumb.tv";

  type Props = Omit<HTMLAttributes<HTMLLIElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<li class={cn(breadcrumbItem(), className)} {...rest}>
  {@render children?.()}
</li>
