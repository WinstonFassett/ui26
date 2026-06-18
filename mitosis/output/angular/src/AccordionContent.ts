import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component } from "@angular/core";

export interface AccordionContentProps {
  class?: string;
}

import {
  accordionContent,
  accordionContentInner,
} from "../../apps/docs/registry/accordion/accordion.tv";

@Component({
  selector: "accordion-content",
  template: `
    <div [class]="accordionContent()">
      <div [class]="accordionContentInner()"><slot></slot></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export default class AccordionContent {
  accordionContent = accordionContent;
  accordionContentInner = accordionContentInner;
}

@NgModule({
  declarations: [AccordionContent],
  imports: [CommonModule],
  exports: [AccordionContent],
})
export class AccordionContentModule {}
