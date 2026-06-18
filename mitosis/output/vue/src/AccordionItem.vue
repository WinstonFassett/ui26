<template>
  <details :open="open" :class="accordionItem()"><slot></slot></details>
</template>

<script setup lang="ts">
import { accordionItem } from "../../apps/docs/registry/accordion/accordion.tv";

export interface AccordionItemProps {
  open?: boolean;
  class?: string;
}

const props = defineProps<AccordionItemProps>();
</script>