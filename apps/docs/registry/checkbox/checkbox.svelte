<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../lib/utils";
  import { checkbox } from "./checkbox.tv";

  type Props = Omit<HTMLInputAttributes, "class" | "type"> & {
    class?: string;
  };

  let { class: className, ...rest }: Props = $props();
</script>

<input type="checkbox" class={cn(checkbox(), className)} {...rest} />
