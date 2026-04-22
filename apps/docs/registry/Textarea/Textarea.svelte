<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import { cn } from "../_shared/lib/cn";
  import { textarea } from "./Textarea.tv";

  type Props = Omit<HTMLTextareaAttributes, "class"> & {
    class?: string;
  };

  let { class: className, ...rest }: Props = $props();
</script>

<textarea class={cn(textarea(), className)} {...rest}></textarea>
