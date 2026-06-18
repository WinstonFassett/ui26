export interface ButtonProps {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
}

import { button } from "../../apps/docs/registry/button/button.tv";

function Button(props: ButtonProps) {
  return (
    <>
      <button
        class={button({
          variant: props.variant,
          size: props.size,
        })}
        type={props.type ?? "button"}
        disabled={props.disabled}
      >
        <slot></slot>
      </button>
    </>
  );
}

export default Button;
