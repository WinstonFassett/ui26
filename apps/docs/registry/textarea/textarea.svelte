<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import { cn } from "../lib/utils";
  import { textarea } from "./textarea.tv";

  type Props = Omit<HTMLTextareaAttributes, "class"> & {
    class?: string;
  };

  let { class: className, ...rest }: Props = $props();
</script>

<textarea class={cn(textarea(), className)} {...rest}></textarea>
