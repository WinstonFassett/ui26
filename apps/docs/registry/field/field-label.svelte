<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import Label from "../label/label.svelte";
  import { fieldLabel } from "./field.tv";

  type Props = Omit<HTMLAttributes<HTMLLabelElement>, "class"> & {
    class?: string;
    for?: string;
    children?: Snippet;
  };

  let { class: className, for: htmlFor, children, ...rest }: Props = $props();
</script>

<Label data-slot="field-label" for={htmlFor} class={cn(fieldLabel(), className)} {...rest}>
  {@render children?.()}
</Label>
