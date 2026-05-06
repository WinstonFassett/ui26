<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { breadcrumbPage } from "./breadcrumb.tv";

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<span role="link" aria-disabled="true" aria-current="page" class={cn(breadcrumbPage(), className)} {...rest}>
  {@render children?.()}
</span>
