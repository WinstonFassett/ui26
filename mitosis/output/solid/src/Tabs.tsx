import { Show, For, createSignal, createMemo } from "solid-js";

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

function Tabs(props: TabsProps) {
  const [activeTab, setActiveTab] = createSignal(
    props.defaultValue ?? props.tabs[0]?.value ?? ""
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
          <For each={props.tabs}>
            {(tab, _index) => {
              const index = _index();
              return (
                <button
                  class={tabsTrigger({
                    variant: props.variant,
                  })}
                  role="tab"
                  data-state={activeTab() === tab.value ? "active" : "inactive"}
                  aria-selected={activeTab() === tab.value}
                  onClick={(event) => activate(tab.value)}
                >
                  {tab.label}
                </button>
              );
            }}
          </For>
        </div>
        <For each={props.tabs}>
          {(tab, _index) => {
            const index = _index();
            return (
              <Show when={activeTab() === tab.value}>
                <div class={tabsContent()} role="tabpanel" data-state="active">
                  {tab.content}
                </div>
              </Show>
            );
          }}
        </For>
      </div>
    </>
  );
}

export default Tabs;
