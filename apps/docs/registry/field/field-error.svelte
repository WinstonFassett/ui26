<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { fieldError } from "./field.tv";

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

{#if children}
  <div role="alert" data-slot="field-error" class={cn(fieldError(), className)} {...rest}>
    {@render children()}
  </div>
{/if}
