<template>
  <template v-if="active">
    <div role="tabpanel" data-state="active" :class="tabsContent()">
      <slot></slot>
    </div>
  </template>
</template>

<script setup lang="ts">
import { tabsContent } from "../../apps/docs/registry/tabs/tabs.tv";

export interface TabsContentProps {
  active?: boolean;
  class?: string;
}

const props = defineProps<TabsContentProps>();
</script>