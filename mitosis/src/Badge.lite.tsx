import { useStore } from '@builder.io/mitosis';
import { badge } from '../../apps/docs/registry/badge/badge.tv';

export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  class?: string;
}

export default function Badge(props: BadgeProps) {
  return (
    <span class={badge({ variant: props.variant })}>
      <slot />
    </span>
  );
}
