import { For, createSignal, createMemo } from "solid-js";

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

function Tabs(props: TabsProps) {
  const [activeTab, setActiveTab] = createSignal(
    props.defaultValue ?? props.triggers[0]?.value ?? ""
  );

  function activate(value: string) {
    setActiveTab(value);
  }

  return (
    <>
      <div>
        <div
          class={tabsList({
            variant: props.variant,
          })}
          role="tablist"
        >
          <For each={props.triggers}>
            {(trigger, _index) => {
              const index = _index();
              return (
                <button
                  class={tabsTrigger({
                    variant: props.variant,
                  })}
                  role="tab"
                  data-state={
                    activeTab() === trigger.value ? "active" : "inactive"
                  }
                  aria-selected={activeTab() === trigger.value}
                  onClick={(event) => activate(trigger.value)}
                >
                  {trigger.label}
                </button>
              );
            }}
          </For>
        </div>
        <slot></slot>
      </div>
    </>
  );
}

export default Tabs;
