<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { fieldLegend, type FieldLegendVariants } from "./field.tv";

  type Props = Omit<HTMLAttributes<HTMLLegendElement>, "class"> &
    FieldLegendVariants & {
      class?: string;
      children?: Snippet;
    };

  let { variant = "legend", class: className, children, ...rest }: Props = $props();
</script>

<legend
  data-slot="field-legend"
  data-variant={variant}
  class={cn(fieldLegend({ variant }), className)}
  {...rest}
>
  {@render children?.()}
</legend>
