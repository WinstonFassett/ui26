import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";

export interface ButtonProps {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
}

import { button } from "../../apps/docs/registry/button/button.tv";

@Component({
  selector: "button",
  template: `
    <button
      [attr.type]="type ?? 'button'"
      [attr.disabled]="disabled"
      [class]="button({
          variant: variant,
          size: size
        })"
    >
      <slot></slot>
    </button>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export default class Button {
  button = button;

  @Input() type!: ButtonProps["type"];
  @Input() disabled!: ButtonProps["disabled"];
  @Input() variant!: ButtonProps["variant"];
  @Input() size!: ButtonProps["size"];
}

@NgModule({
  declarations: [Button],
  imports: [CommonModule],
  exports: [Button],
})
export class ButtonModule {}
