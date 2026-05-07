<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { breadcrumbLink } from "./breadcrumb.tv";

  type Props = Omit<HTMLAnchorAttributes, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<a class={cn(breadcrumbLink(), className)} {...rest}>
  {@render children?.()}
</a>
