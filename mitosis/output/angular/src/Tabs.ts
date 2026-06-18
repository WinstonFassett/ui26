import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";

export interface TabTrigger {
  value: string;
  label: string;
}
export interface TabsProps {
  triggers: TabTrigger[];
  defaultValue?: string;
  variant?: "pill" | "underline";
}

import { tabsList, tabsTrigger } from "../../apps/docs/registry/tabs/tabs.tv";

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
        <ng-container *ngFor="let trigger of triggers"
          ><button
            role="tab"
            [attr.data-state]="activeTab === trigger.value ? 'active' : 'inactive'"
            [attr.aria-selected]="activeTab === trigger.value"
            [class]="tabsTrigger({
          variant: variant
        })"
            (click)="activate(trigger.value)"
          >
            {{trigger.label}}
          </button></ng-container
        >
      </div>
      <slot></slot>
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

  @Input() defaultValue!: TabsProps["defaultValue"];
  @Input() triggers!: TabsProps["triggers"];
  @Input() variant!: TabsProps["variant"];

  activeTab = null;
  activate(value: string) {
    this.activeTab = value;
  }

  ngOnInit() {
    this.activeTab = this.defaultValue ?? this.triggers[0]?.value ?? "";
  }
}

@NgModule({
  declarations: [Tabs],
  imports: [CommonModule],
  exports: [Tabs],
})
export class TabsModule {}
