<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { avatarFallback } from "./avatar.tv";

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, "class"> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<span class={cn(avatarFallback(), className)} {...rest}>
  {@render children?.()}
</span>
