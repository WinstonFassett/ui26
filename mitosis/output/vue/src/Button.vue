<template>
  <button
    :type="type ?? 'button'"
    :disabled="disabled"
    :class="
      button({
        variant: variant,
        size: size,
      })
    "
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { button } from "../../apps/docs/registry/button/button.tv";

export interface ButtonProps {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
}

const props = defineProps<ButtonProps>();
</script>