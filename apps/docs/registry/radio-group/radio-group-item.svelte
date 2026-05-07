<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../lib/utils";
  import { radioGroupItem } from "./radio-group.tv";

  type Props = Omit<HTMLInputAttributes, "class" | "type"> & { class?: string };

  let { class: className, ...rest }: Props = $props();
</script>

<input type="radio" class={cn(radioGroupItem(), className)} {...rest} />
