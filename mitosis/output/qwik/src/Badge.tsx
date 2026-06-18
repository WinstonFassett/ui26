import { badge } from "../../apps/docs/registry/badge/badge.tv";

import { Fragment, component$, h } from "@builder.io/qwik";

export interface BadgeProps {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  class?: string;
}
export const Badge = component$((props: BadgeProps) => {
  return (
    <span
      class={badge({
        variant: props.variant,
      })}
    >
      <slot></slot>
    </span>
  );
});

export default Badge;
