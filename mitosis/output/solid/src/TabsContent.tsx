import { Show } from "solid-js";

export interface TabsContentProps {
  active?: boolean;
  class?: string;
}

import { tabsContent } from "../../apps/docs/registry/tabs/tabs.tv";

function TabsContent(props: TabsContentProps) {
  return (
    <>
      <Show when={props.active}>
        <div class={tabsContent()} role="tabpanel" data-state="active">
          <slot></slot>
        </div>
      </Show>
    </>
  );
}

export default TabsContent;
