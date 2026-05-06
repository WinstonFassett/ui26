<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../lib/utils";
  import { accordionTrigger } from "./accordion.tv";

  type Props = {
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<summary class={cn(accordionTrigger(), className)} {...rest}>
  {@render children?.()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="size-4 shrink-0 transition-transform duration-200"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
</summary>

<style>
  details[open] summary svg {
    transform: rotate(180deg);
  }
</style>
