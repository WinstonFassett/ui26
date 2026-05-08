<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { fieldSeparator } from "./field.tv";
  import Separator from "../separator/separator.svelte";

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  data-slot="field-separator"
  data-content={!!children}
  class={cn(fieldSeparator(), className)}
  {...rest}
>
  <Separator class="absolute inset-0 top-1/2" />
  {#if children}
    <span
      data-slot="field-separator-content"
      class="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
    >
      {@render children()}
    </span>
  {/if}
</div>
