import { Children, isValidElement, useId, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { tabsList, tabsTrigger, tabsContent } from "./tabs.tv";


export interface TabsProgressiveItemProps {
  label: string;
  className?: string;
  children?: ReactNode;
}

export function TabsProgressiveItem({ label: _label, className, children }: TabsProgressiveItemProps) {
  return (
    <div
      role="tabpanel"
      data-ui26-tab-item
      data-label={_label}
      className={cn(tabsContent(), "ui26-tab-panel", className)}
    >
      {children}
    </div>
  );
}

export interface TabsProgressiveProps extends HTMLAttributes<HTMLElement> {
  defaultIndex?: number;
  variant?: "pill" | "underline";
  listClass?: string;
  children?: ReactNode;
}

export function TabsProgressive({
  defaultIndex = 0,
  variant = "pill",
  listClass,
  className,
  children,
  id: providedId,
  ...props
}: TabsProgressiveProps) {
  const generatedId = useId();
  const uid = providedId ?? `tabs-${generatedId.replace(/:/g, "")}`;

  const labels: string[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && (child.props as TabsProgressiveItemProps).label) {
      labels.push((child.props as TabsProgressiveItemProps).label);
    }
  });

  let idx = 0;
  const enhancedChildren = Children.map(children, (child) => {
    if (isValidElement(child) && (child.props as TabsProgressiveItemProps).label != null) {
      const i = idx++;
      return (
        <div
          role="tabpanel"
          data-ui26-tab-item
          data-panel-index={i}
          aria-labelledby={`${uid}-label-${i}`}
          className={cn(
            tabsContent(),
            "ui26-tab-panel",
            (child.props as TabsProgressiveItemProps).className
          )}
        >
          {(child.props as TabsProgressiveItemProps).children}
        </div>
      );
    }
    return child;
  });

  const activeStyle =
    variant === "underline"
      ? "border-color:var(--accent);color:var(--foreground)"
      : "background:var(--background);color:var(--foreground);box-shadow:var(--shadow-sm,0 1px 2px 0 rgb(0 0 0 / 0.05))";

  const instanceCss =
    `ui26-tabs#${uid} > .ui26-tab-panel{display:none}` +
    `ui26-tabs#${uid} .ui26-tab-label{cursor:pointer;user-select:none}` +
    labels
      .map(
        (_, i) =>
          `ui26-tabs#${uid}:has(> #${uid}-${i}:checked) > .ui26-tab-panel[data-panel-index="${i}"]{display:block}` +
          `ui26-tabs#${uid}:has(> #${uid}-${i}:checked) > .tablist > .ui26-tab-label[data-tab-index="${i}"]{${activeStyle}}`
      )
      .join("");

  return (
    <ui26-tabs
      className={cn("ui26-tabs w-full block", className)}
      data-default={defaultIndex}
      id={uid}
      {...props}
    >
      {labels.map((_, i) => (
        <input
          key={i}
          type="radio"
          className="sr-only"
          name={uid}
          id={`${uid}-${i}`}
          defaultChecked={i === defaultIndex}
        />
      ))}

      <div className={cn(tabsList({ variant }), "tablist", listClass)} role="tablist">
        {labels.map((label, i) => (
          <label
            key={i}
            htmlFor={`${uid}-${i}`}
            id={`${uid}-label-${i}`}
            role="tab"
            data-tab-index={i}
            aria-selected={i === defaultIndex ? "true" : "false"}
            className={cn(tabsTrigger({ variant }), "ui26-tab-label")}
          >
            {label}
          </label>
        ))}
      </div>

      {enhancedChildren}

      <style dangerouslySetInnerHTML={{ __html: instanceCss }} />
    </ui26-tabs>
  );
}
