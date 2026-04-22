<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../_shared/lib/cn";
  import { input } from "./Input.tv";

  type Props = Omit<HTMLInputAttributes, "class"> & {
    class?: string;
  };

  let { class: className, ...rest }: Props = $props();
</script>

<input class={cn(input(), className)} {...rest} />
