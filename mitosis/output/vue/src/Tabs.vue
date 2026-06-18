<template>
  <div>
    <div
      role="tablist"
      :class="
        tabsList({
          variant: variant,
        })
      "
    >
      <template :key="index" v-for="(trigger, index) in triggers">
        <button
          role="tab"
          :data-state="activeTab === trigger.value ? 'active' : 'inactive'"
          :aria-selected="activeTab === trigger.value"
          :class="
            tabsTrigger({
              variant: variant,
            })
          "
          @click="async (event) => activate(trigger.value)"
        >
          {{ trigger.label }}
        </button>
      </template>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { tabsList, tabsTrigger } from "../../apps/docs/registry/tabs/tabs.tv";

export interface TabTrigger {
  value: string;
  label: string;
}
export interface TabsProps {
  triggers: TabTrigger[];
  defaultValue?: string;
  variant?: "pill" | "underline";
}

const props = defineProps<TabsProps>();
const activeTab = ref(props.defaultValue ?? props.triggers[0]?.value ?? "");

function activate(value: string) {
  activeTab.value = value;
}
</script>