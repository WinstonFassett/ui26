<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { accordionContent, accordionContentInner } from "./accordion.tv";

  type Props = {
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<div class={cn(accordionContent(), className)} {...rest}>
  <div class={cn(accordionContentInner())}>
    {@render children?.()}
  </div>
</div>
