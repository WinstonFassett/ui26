import {
  tabsContent,
  tabsList,
  tabsTrigger,
} from "../../apps/docs/registry/tabs/tabs.tv";

import { $, Fragment, component$, h, useStore } from "@builder.io/qwik";

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
export const activate = function activate(props, state, value: string) {
  state.activeTab = value;
};
export const Tabs = component$((props: TabsProps) => {
  const state = useStore<any>({
    activeTab: props.defaultValue ?? props.tabs[0]?.value ?? "",
  });

  return (
    <div>
      <div
        role="tablist"
        class={tabsList({
          variant: props.variant,
        })}
      >
        {(props.tabs || []).map((tab) => {
          return (
            <button
              role="tab"
              data-state={(() => {
                state.activeTab === tab.value ? "active" : "inactive";
              })()}
              aria-selected={(() => {
                state.activeTab === tab.value;
              })()}
              class={tabsTrigger({
                variant: props.variant,
              })}
              onClick$={$((event) => activate(props, state, tab.value))}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {(props.tabs || []).map((tab) => {
        return state.activeTab === tab.value ? (
          <div role="tabpanel" data-state="active" class={tabsContent()}>
            {tab.content}
          </div>
        ) : null;
      })}
    </div>
  );
});

export default Tabs;
