<template>
  <div :class="accordionContent()">
    <div :class="accordionContentInner()"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
import {
  accordionContent,
  accordionContentInner,
} from "../../apps/docs/registry/accordion/accordion.tv";

export interface AccordionContentProps {
  class?: string;
}
</script>