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
      <template :key="index" v-for="(tab, index) in tabs">
        <button
          role="tab"
          :data-state="activeTab === tab.value ? 'active' : 'inactive'"
          :aria-selected="activeTab === tab.value"
          :class="
            tabsTrigger({
              variant: variant,
            })
          "
          @click="async (event) => activate(tab.value)"
        >
          {{ tab.label }}
        </button>
      </template>
    </div>
    <template :key="index" v-for="(tab, index) in tabs">
      <template v-if="activeTab === tab.value">
        <div role="tabpanel" data-state="active" :class="tabsContent()">
          {{ tab.content }}
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import {
  tabsList,
  tabsTrigger,
  tabsContent,
} from "../../apps/docs/registry/tabs/tabs.tv";

export interface TabItem {
  value: string;
  label: string;
  content: string;
}
export interface TabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  variant?: "pill" | "underline";
}

const props = defineProps<TabsProps>();
const activeTab = ref(props.defaultValue ?? props.tabs[0]?.value ?? "");

function activate(value: string) {
  activeTab.value = value;
}
</script>