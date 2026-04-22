<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../lib/utils";
  import { switchRoot, switchThumb } from "./switch.tv";

  type Props = Omit<HTMLInputAttributes, "class" | "type"> & {
    class?: string;
    rootClass?: string;
  };

  let { class: className, rootClass, ...rest }: Props = $props();
</script>

<label class={cn(switchRoot(), rootClass)}>
  <input type="checkbox" class={cn("peer sr-only", className)} {...rest} />
  <span class={switchThumb()}></span>
</label>
