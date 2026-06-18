import { useStore, onMount } from '@builder.io/mitosis';
import { tabsList, tabsTrigger, tabsContent } from '../../apps/docs/registry/tabs/tabs.tv';

export interface TabItem {
  value: string;
  label: string;
  content: string;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  variant?: 'pill' | 'underline';
}

export default function Tabs(props: TabsProps) {
  const state = useStore({
    activeTab: props.defaultValue ?? props.tabs[0]?.value ?? '',
    activate(value: string) {
      state.activeTab = value;
    },
  });

  return (
    <div>
      <div class={tabsList({ variant: props.variant })} role="tablist">
        <For each={props.tabs}>
          {(tab) => (
            <button
              role="tab"
              data-state={state.activeTab === tab.value ? 'active' : 'inactive'}
              aria-selected={state.activeTab === tab.value}
              class={tabsTrigger({ variant: props.variant })}
              onClick={() => state.activate(tab.value)}
            >
              {tab.label}
            </button>
          )}
        </For>
      </div>
      <For each={props.tabs}>
        {(tab) => (
          <Show when={state.activeTab === tab.value}>
            <div
              role="tabpanel"
              data-state="active"
              class={tabsContent()}
            >
              {tab.content}
            </div>
          </Show>
        )}
      </For>
    </div>
  );
}
