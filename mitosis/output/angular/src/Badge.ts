import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";

export interface BadgeProps {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  class?: string;
}

import { badge } from "../../apps/docs/registry/badge/badge.tv";

@Component({
  selector: "badge",
  template: `
    <span
      [class]="badge({
          variant: variant
        })"
      ><slot></slot
    ></span>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export default class Badge {
  badge = badge;

  @Input() variant!: BadgeProps["variant"];
}

@NgModule({
  declarations: [Badge],
  imports: [CommonModule],
  exports: [Badge],
})
export class BadgeModule {}
