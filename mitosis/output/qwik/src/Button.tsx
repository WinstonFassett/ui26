import { button } from "../../apps/docs/registry/button/button.tv";

import { Fragment, component$, h } from "@builder.io/qwik";

export interface ButtonProps {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
}
export const Button = component$((props: ButtonProps) => {
  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      class={button({
        variant: props.variant,
        size: props.size,
      })}
    >
      <slot></slot>
    </button>
  );
});

export default Button;
