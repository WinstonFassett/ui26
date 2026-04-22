<script lang="ts">
  import type { HTMLLabelAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../_shared/lib/cn";
  import { label } from "./Label.tv";

  type Props = Omit<HTMLLabelAttributes, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<label class={cn(label(), className)} {...rest}>
  {@render children?.()}
</label>
