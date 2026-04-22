<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../_shared/lib/cn";
  import { checkbox } from "./Checkbox.tv";

  type Props = Omit<HTMLInputAttributes, "class" | "type"> & {
    class?: string;
  };

  let { class: className, ...rest }: Props = $props();
</script>

<input type="checkbox" class={cn(checkbox(), className)} {...rest} />
