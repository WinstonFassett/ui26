<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { breadcrumbList } from "./breadcrumb.tv";

  type Props = Omit<HTMLAttributes<HTMLOListElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<ol class={cn(breadcrumbList(), className)} {...rest}>
  {@render children?.()}
</ol>
