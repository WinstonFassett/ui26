<template>
  <span
    :class="
      badge({
        variant: variant,
      })
    "
    ><slot></slot
  ></span>
</template>

<script setup lang="ts">
import { badge } from "../../apps/docs/registry/badge/badge.tv";

export interface BadgeProps {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  class?: string;
}

const props = defineProps<BadgeProps>();
</script>