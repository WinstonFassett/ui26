<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { accordionItem } from "./accordion.tv";

  type Props = {
    class?: string;
    open?: boolean;
    children?: Snippet;
    [key: string]: unknown;
  };

  let { class: className, open, children, ...rest }: Props = $props();
</script>

<details open={open} class={cn(accordionItem(), className)} {...rest}>
  {@render children?.()}
</details>
