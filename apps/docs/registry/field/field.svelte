<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { field, type FieldVariants } from "./field.tv";

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> &
    FieldVariants & {
      class?: string;
      children?: Snippet;
    };

  let { orientation = "vertical", class: className, children, ...rest }: Props = $props();
</script>

<div
  role="group"
  data-slot="field"
  data-orientation={orientation}
  class={cn(field({ orientation }), className)}
  {...rest}
>
  {@render children?.()}
</div>
