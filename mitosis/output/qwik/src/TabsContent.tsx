import { tabsContent } from "../../apps/docs/registry/tabs/tabs.tv";

import { Fragment, component$, h } from "@builder.io/qwik";

export interface TabsContentProps {
  active?: boolean;
  class?: string;
}
export const TabsContent = component$((props: TabsContentProps) => {
  return (
    <>
      {props.active ? (
        <div role="tabpanel" data-state="active" class={tabsContent()}>
          <slot></slot>
        </div>
      ) : null}
    </>
  );
});

export default TabsContent;
