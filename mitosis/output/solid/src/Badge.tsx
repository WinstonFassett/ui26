export interface BadgeProps {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  class?: string;
}

import { badge } from "../../apps/docs/registry/badge/badge.tv";

function Badge(props: BadgeProps) {
  return (
    <>
      <span
        class={badge({
          variant: props.variant,
        })}
      >
        <slot></slot>
      </span>
    </>
  );
}

export default Badge;
