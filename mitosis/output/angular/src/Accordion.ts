import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component } from "@angular/core";

export interface AccordionProps {
  class?: string;
}

@Component({
  selector: "accordion",
  template: ` <div class="w-full"><slot></slot></div> `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export default class Accordion {}

@NgModule({
  declarations: [Accordion],
  imports: [CommonModule],
  exports: [Accordion],
})
export class AccordionModule {}
