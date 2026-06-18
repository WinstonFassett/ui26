import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";

export interface AccordionItemProps {
  open?: boolean;
  class?: string;
}

import { accordionItem } from "../../apps/docs/registry/accordion/accordion.tv";

@Component({
  selector: "accordion-item",
  template: `
    <details [attr.open]="open" [class]="accordionItem()">
      <slot></slot>
    </details>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export default class AccordionItem {
  accordionItem = accordionItem;

  @Input() open!: AccordionItemProps["open"];
}

@NgModule({
  declarations: [AccordionItem],
  imports: [CommonModule],
  exports: [AccordionItem],
})
export class AccordionItemModule {}
