import { useStore } from '@builder.io/mitosis';
import { tabsList, tabsTrigger } from '../../apps/docs/registry/tabs/tabs.tv';

export interface TabTrigger {
  value: string;
  label: string;
}

export interface TabsProps {
  triggers: TabTrigger[];
  defaultValue?: string;
  variant?: 'pill' | 'underline';
}

export default function Tabs(props: TabsProps) {
  const state = useStore({
    activeTab: props.defaultValue ?? props.triggers[0]?.value ?? '',
    activate(value: string) {
      state.activeTab = value;
    },
  });

  return (
    <div>
      <div class={tabsList({ variant: props.variant })} role="tablist">
        <For each={props.triggers}>
          {(trigger) => (
            <button
              role="tab"
              data-state={state.activeTab === trigger.value ? 'active' : 'inactive'}
              aria-selected={state.activeTab === trigger.value}
              class={tabsTrigger({ variant: props.variant })}
              onClick={() => state.activate(trigger.value)}
            >
              {trigger.label}
            </button>
          )}
        </For>
      </div>
      <slot />
    </div>
  );
}
