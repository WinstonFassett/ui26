<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { fieldDescription } from "./field.tv";

  type Props = Omit<HTMLAttributes<HTMLParagraphElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<p data-slot="field-description" class={cn(fieldDescription(), className)} {...rest}>
  {@render children?.()}
</p>
