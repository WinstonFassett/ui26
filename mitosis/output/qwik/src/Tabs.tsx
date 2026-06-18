import { tabsList, tabsTrigger } from "../../apps/docs/registry/tabs/tabs.tv";

import { $, Fragment, component$, h, useStore } from "@builder.io/qwik";

export interface TabTrigger {
  value: string;
  label: string;
}
export interface TabsProps {
  triggers: TabTrigger[];
  defaultValue?: string;
  variant?: "pill" | "underline";
}
export const activate = function activate(props, state, value: string) {
  state.activeTab = value;
};
export const Tabs = component$((props: TabsProps) => {
  const state = useStore<any>({
    activeTab: props.defaultValue ?? props.triggers[0]?.value ?? "",
  });

  return (
    <div>
      <div
        role="tablist"
        class={tabsList({
          variant: props.variant,
        })}
      >
        {(props.triggers || []).map((trigger) => {
          return (
            <button
              role="tab"
              data-state={(() => {
                state.activeTab === trigger.value ? "active" : "inactive";
              })()}
              aria-selected={(() => {
                state.activeTab === trigger.value;
              })()}
              class={tabsTrigger({
                variant: props.variant,
              })}
              onClick$={$((event) => activate(props, state, trigger.value))}
            >
              {trigger.label}
            </button>
          );
        })}
      </div>
      <slot></slot>
    </div>
  );
});

export default Tabs;
