import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";

export interface TabsContentProps {
  active?: boolean;
  class?: string;
}

import { tabsContent } from "../../apps/docs/registry/tabs/tabs.tv";

@Component({
  selector: "tabs-content",
  template: `
    <ng-container *ngIf="active"
      ><div role="tabpanel" data-state="active" [class]="tabsContent()">
        <slot></slot></div
    ></ng-container>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export default class TabsContent {
  tabsContent = tabsContent;

  @Input() active!: TabsContentProps["active"];
}

@NgModule({
  declarations: [TabsContent],
  imports: [CommonModule],
  exports: [TabsContent],
})
export class TabsContentModule {}
