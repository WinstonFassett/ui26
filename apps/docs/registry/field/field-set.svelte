<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { fieldSet } from "./field.tv";

  type Props = Omit<HTMLAttributes<HTMLFieldSetElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<fieldset data-slot="field-set" class={cn(fieldSet(), className)} {...rest}>
  {@render children?.()}
</fieldset>
