import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";

export interface TabItem {
  value: string;
  label: string;
  content: string;
}
export interface TabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  variant?: "pill" | "underline";
}

import {
  tabsList,
  tabsTrigger,
  tabsContent,
} from "../../apps/docs/registry/tabs/tabs.tv";

@Component({
  selector: "tabs",
  template: `
    <div>
      <div
        role="tablist"
        [class]="tabsList({
          variant: variant
        })"
      >
        <ng-container *ngFor="let tab of tabs"
          ><button
            role="tab"
            [attr.data-state]="activeTab === tab.value ? 'active' : 'inactive'"
            [attr.aria-selected]="activeTab === tab.value"
            [class]="tabsTrigger({
          variant: variant
        })"
            (click)="activate(tab.value)"
          >
            {{tab.label}}
          </button></ng-container
        >
      </div>
      <ng-container *ngFor="let tab of tabs"
        ><ng-container *ngIf="activeTab === tab.value"
          ><div role="tabpanel" data-state="active" [class]="tabsContent()">
            {{tab.content}}
          </div></ng-container
        ></ng-container
      >
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
export default class Tabs {
  tabsList = tabsList;
  tabsTrigger = tabsTrigger;
  tabsContent = tabsContent;

  @Input() defaultValue!: TabsProps["defaultValue"];
  @Input() tabs!: TabsProps["tabs"];
  @Input() variant!: TabsProps["variant"];

  activeTab = null;
  activate(value: string) {
    this.activeTab = value;
  }

  ngOnInit() {
    this.activeTab = this.defaultValue ?? this.tabs[0]?.value ?? "";
  }
}

@NgModule({
  declarations: [Tabs],
  imports: [CommonModule],
  exports: [Tabs],
})
export class TabsModule {}
