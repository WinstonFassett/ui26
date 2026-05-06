<script lang="ts">
  import type { HTMLImgAttributes } from "svelte/elements";
  import { cn } from "../lib/utils";
  import { avatarImage } from "./avatar.tv";

  type Props = Omit<HTMLImgAttributes, "class"> & { class?: string };

  let { class: className, ...rest }: Props = $props();
</script>

<img class={cn(avatarImage(), className)} {...rest} />
