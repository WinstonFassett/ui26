<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { avatarRoot, type AvatarVariants } from "./avatar.tv";

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, "class"> &
    AvatarVariants & {
      class?: string;
      children?: Snippet;
    };

  let { size, class: className, children, ...rest }: Props = $props();
</script>

<span class={cn(avatarRoot({ size }), className)} {...rest}>
  {@render children?.()}
</span>
