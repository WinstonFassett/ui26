<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../lib/utils";
  import { progressRoot, progressIndicator, type ProgressVariants } from "./progress.tv";

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> &
    ProgressVariants & {
      class?: string;
      value?: number;
      max?: number;
    };

  let { value = 0, max = 100, variant, class: className, ...rest }: Props = $props();
  const pct = $derived((value / max) * 100);
</script>

<div
  role="progressbar"
  aria-valuenow={value}
  aria-valuemin={0}
  aria-valuemax={max}
  class={cn(progressRoot(), className)}
  {...rest}
>
  <div
    class={cn(progressIndicator({ variant }))}
    style={`transform: translateX(-${100 - pct}%)`}
  ></div>
</div>
