<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../_shared/lib/cn";
  import { separator, type SeparatorVariants } from "./Separator.tv";

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> &
    SeparatorVariants & {
      class?: string;
      decorative?: boolean;
    };

  let {
    orientation = "horizontal",
    decorative = true,
    class: className,
    ...rest
  }: Props = $props();
</script>

<div
  role={decorative ? "none" : "separator"}
  aria-orientation={decorative ? undefined : orientation}
  class={cn(separator({ orientation }), className)}
  {...rest}
></div>
