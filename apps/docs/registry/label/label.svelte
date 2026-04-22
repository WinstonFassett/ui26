<script lang="ts">
  import type { HTMLLabelAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { label } from "./label.tv";

  type Props = Omit<HTMLLabelAttributes, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<label class={cn(label(), className)} {...rest}>
  {@render children?.()}
</label>
