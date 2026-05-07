<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../lib/utils";
  import { slider } from "./slider.tv";

  type Props = Omit<HTMLInputAttributes, "class" | "type"> & { class?: string };

  let { class: className, ...rest }: Props = $props();
</script>

<input type="range" class={cn(slider(), className)} {...rest} />
