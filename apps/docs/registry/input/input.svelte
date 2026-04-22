<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../lib/utils";
  import { input } from "./input.tv";

  type Props = Omit<HTMLInputAttributes, "class"> & {
    class?: string;
  };

  let { class: className, ...rest }: Props = $props();
</script>

<input class={cn(input(), className)} {...rest} />
