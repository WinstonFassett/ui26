import { tabsContent } from '../../apps/docs/registry/tabs/tabs.tv';

export interface TabsContentProps {
  active?: boolean;
  class?: string;
}

export default function TabsContent(props: TabsContentProps) {
  return (
    <Show when={props.active}>
      <div
        role="tabpanel"
        data-state="active"
        class={tabsContent()}
      >
        <slot />
      </div>
    </Show>
  );
}
