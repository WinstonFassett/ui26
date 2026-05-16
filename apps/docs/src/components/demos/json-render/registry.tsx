"use client";

import { defineRegistry, type BaseComponentProps } from "@json-render/react";
import { cn } from "@/lib/utils";
import { Button as Btn } from "@registry/button/button.tsx";
import { Badge as Bdg } from "@registry/badge/badge.tsx";
import {
  Card as CardRoot,
  CardHeader as CardHeaderRoot,
  CardTitle as CardTitleRoot,
  CardDescription as CardDescriptionRoot,
  CardContent as CardContentRoot,
  CardFooter as CardFooterRoot,
} from "@registry/card/card.tsx";
import { Stack as StackRoot } from "@registry/stack/stack.tsx";
import { Grid as GridRoot } from "@registry/grid/grid.tsx";
import { Heading as HeadingRoot } from "@registry/heading/heading.tsx";
import { Input as InputRoot } from "@registry/input/input.tsx";
import { Textarea as TextareaRoot } from "@registry/textarea/textarea.tsx";
import { Checkbox as CheckboxRoot } from "@registry/checkbox/checkbox.tsx";
import { Switch as SwitchRoot } from "@registry/switch/switch.tsx";
import { Label as LabelRoot } from "@registry/label/label.tsx";
import { Alert as AlertRoot, AlertTitle as AlertTitleRoot, AlertDescription as AlertDescriptionRoot } from "@registry/alert/alert.tsx";
import { Separator as Sep } from "@registry/separator/separator.tsx";
import { Toggle as ToggleRoot } from "@registry/toggle/toggle.tsx";
import { Slider as SliderRoot } from "@registry/slider/slider.tsx";
import { Avatar as AvatarRoot, AvatarFallback as AvatarFallbackRoot } from "@registry/avatar/avatar.tsx";
import { Skeleton as SkeletonRoot } from "@registry/skeleton/skeleton.tsx";
import { Progress as ProgressRoot } from "@registry/progress/progress.tsx";
import {
  Accordion as AccordionRoot,
  AccordionItem as AccordionItemRoot,
  AccordionTrigger as AccordionTriggerRoot,
  AccordionContent as AccordionContentRoot,
} from "@registry/accordion/accordion.tsx";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbList as BreadcrumbListRoot,
  BreadcrumbItem as BreadcrumbItemRoot,
  BreadcrumbLink as BreadcrumbLinkRoot,
  BreadcrumbPage as BreadcrumbPageRoot,
  BreadcrumbSeparator as BreadcrumbSeparatorRoot,
} from "@registry/breadcrumb/breadcrumb.tsx";
import {
  Pagination as PaginationRoot,
  PaginationContent as PaginationContentRoot,
  PaginationItem as PaginationItemRoot,
  PaginationLink as PaginationLinkRoot,
} from "@registry/pagination/pagination.tsx";
import { RadioGroup as RadioGroupRoot, RadioGroupItem as RadioGroupItemRoot } from "@registry/radio-group/radio-group.tsx";
import { Tabs as TabsRoot, TabsList as TabsListRoot, TabsTrigger as TabsTriggerRoot, TabsContent as TabsContentRoot } from "@registry/tabs/tabs.tsx";
import {
  Field as FieldRoot,
  FieldContent as FieldContentRoot,
  FieldLabel as FieldLabelRoot,
  FieldDescription as FieldDescriptionRoot,
  FieldError as FieldErrorRoot,
  FieldGroup as FieldGroupRoot,
  FieldSet as FieldSetRoot,
  FieldLegend as FieldLegendRoot,
  FieldTitle as FieldTitleRoot,
  FieldSeparator as FieldSeparatorRoot,
} from "@registry/field/field.tsx";
import {
  catalog,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
  type ButtonProps,
  type BadgeProps,
  type StackProps,
  type GridProps,
  type TextProps,
  type HeadingProps,
  type CardProps,
  type CardSlotProps,
  type CardTextSlotProps,
  type CardFooterProps,
  type SeparatorProps,
  type InputProps,
  type TextareaProps,
  type CheckboxProps,
  type SwitchControlProps,
  type LabelProps,
  type AlertProps,
  type AlertTextSlotProps,
  type FieldProps,
  type FieldContentProps,
  type FieldLabelProps,
  type FieldDescriptionProps,
  type FieldErrorProps,
  type FieldGroupProps,
  type FieldSetProps,
  type FieldLegendProps,
  type FieldTitleProps,
  type FieldSeparatorProps,
  type ToggleProps,
  type SliderProps,
  type AvatarProps,
  type AvatarFallbackProps,
  type SkeletonProps,
  type ProgressProps,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
  type BreadcrumbProps,
  type BreadcrumbListProps,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  type BreadcrumbPageProps,
  type BreadcrumbSeparatorProps,
  type PaginationProps,
  type PaginationContentProps,
  type PaginationItemProps,
  type PaginationLinkProps,
  type RadioGroupProps,
  type RadioGroupItemProps,
} from "./catalog";

// Catalog uses .nullable() so unset Spec props serialize as JSON `null`.
// React props expect undefined for unset, so coerce at the registry boundary.
function u<T extends Record<string, unknown>>(props: T): { [K in keyof T]: Exclude<T[K], null> | undefined } {
  const out: Record<string, unknown> = {};
  for (const k in props) {
    out[k] = props[k] === null ? undefined : props[k];
  }
  return out as { [K in keyof T]: Exclude<T[K], null> | undefined };
}

export const { registry } = defineRegistry(catalog, {
  components: {
    // ── Pass-throughs (catalog props match component props 1:1) ──────────
    Stack: ({ props, children }: BaseComponentProps<StackProps>) => (
      <StackRoot {...u(props)}>{children}</StackRoot>
    ),
    Grid: ({ props, children }: BaseComponentProps<GridProps>) => (
      <GridRoot {...u(props)}>{children}</GridRoot>
    ),
    Card: ({ props, children }: BaseComponentProps<CardProps>) => (
      <CardRoot {...u(props)}>{children}</CardRoot>
    ),
    CardHeader: ({ props, children }: BaseComponentProps<CardSlotProps>) => (
      <CardHeaderRoot {...u(props)}>{children}</CardHeaderRoot>
    ),
    CardContent: ({ props, children }: BaseComponentProps<CardSlotProps>) => (
      <CardContentRoot {...u(props)}>{children}</CardContentRoot>
    ),
    Separator: ({ props }: BaseComponentProps<SeparatorProps>) => <Sep {...u(props)} />,
    Toggle: ({ props }: BaseComponentProps<ToggleProps>) => {
      const { label, ...rest } = u(props);
      return <ToggleRoot {...rest}>{label}</ToggleRoot>;
    },
    Slider: ({ props }: BaseComponentProps<SliderProps>) => {
      const { value, ...rest } = u(props);
      return <SliderRoot {...rest} defaultValue={value !== undefined ? String(value) : undefined} />;
    },
    Avatar: ({ props, children }: BaseComponentProps<AvatarProps>) => (
      <AvatarRoot {...u(props)}>{children}</AvatarRoot>
    ),
    AvatarFallback: ({ props }: BaseComponentProps<AvatarFallbackProps>) => {
      const { text, ...rest } = u(props);
      return <AvatarFallbackRoot {...rest}>{text}</AvatarFallbackRoot>;
    },
    Skeleton: ({ props }: BaseComponentProps<SkeletonProps>) => <SkeletonRoot {...u(props)} />,
    Progress: ({ props }: BaseComponentProps<ProgressProps>) => {
      const { value, ...rest } = u(props);
      return <ProgressRoot {...rest} value={value ?? 0} />;
    },

    // ── Content-prop mapping (catalog has `text`/`label`; component takes children) ──
    Heading: ({ props }: BaseComponentProps<HeadingProps>) => {
      const { text, ...rest } = u(props);
      return <HeadingRoot {...rest}>{text}</HeadingRoot>;
    },
    CardTitle: ({ props }: BaseComponentProps<CardTextSlotProps>) => {
      const { text, ...rest } = u(props);
      return <CardTitleRoot {...rest}>{text}</CardTitleRoot>;
    },
    CardDescription: ({ props }: BaseComponentProps<CardTextSlotProps>) => {
      const { text, ...rest } = u(props);
      return <CardDescriptionRoot {...rest}>{text}</CardDescriptionRoot>;
    },
    Badge: ({ props }: BaseComponentProps<BadgeProps>) => {
      const { text, ...rest } = u(props);
      return <Bdg {...rest}>{text}</Bdg>;
    },
    Button: ({ props, emit }: BaseComponentProps<ButtonProps>) => {
      const { label, ...rest } = u(props);
      return (
        <Btn {...rest} onClick={() => emit("press")}>
          {label}
        </Btn>
      );
    },

    // CardFooter adds layout (border-top + spacing) on top of the underlying component.
    CardFooter: ({ props, children }: BaseComponentProps<CardFooterProps>) => {
      const { className, ...rest } = u(props);
      return (
        <CardFooterRoot {...rest} className={cn("mt-4 border-t border-border pt-4", className)}>
          {children}
        </CardFooterRoot>
      );
    },

    // ── Spec-only Text — lowers to <p className="..."> in generated source. ──
    // cn() / twMerge resolves any conflicts between defaults and props.className.
    Text: ({ props }: BaseComponentProps<TextProps>) => (
      <p
        className={cn(
          props.size ? `text-${props.size}` : "text-sm",
          props.muted && "text-muted-foreground",
          props.mono && "font-mono",
          props.className,
        )}
      >
        {props.content}
      </p>
    ),

    // ── Bare form controls (compose inside Field) ───────────────────────
    Input: ({ props }: BaseComponentProps<InputProps>) => {
      const { value, invalid, ...rest } = u(props);
      return (
        <InputRoot
          {...rest}
          type={props.type ?? "text"}
          defaultValue={value}
          aria-invalid={invalid || undefined}
        />
      );
    },
    Textarea: ({ props }: BaseComponentProps<TextareaProps>) => {
      const { value, invalid, rows, ...rest } = u(props);
      return (
        <TextareaRoot
          {...rest}
          rows={rows ?? 4}
          defaultValue={value}
          aria-invalid={invalid || undefined}
        />
      );
    },
    Checkbox: ({ props }: BaseComponentProps<CheckboxProps>) => {
      const { checked, ...rest } = u(props);
      return <CheckboxRoot {...rest} defaultChecked={checked ?? false} />;
    },
    Switch: ({ props }: BaseComponentProps<SwitchControlProps>) => {
      const { checked, ...rest } = u(props);
      return <SwitchRoot {...rest} defaultChecked={checked ?? false} />;
    },
    Label: ({ props }: BaseComponentProps<LabelProps>) => {
      const { text, htmlFor, ...rest } = u(props);
      return <LabelRoot {...rest} htmlFor={htmlFor}>{text}</LabelRoot>;
    },
    Alert: ({ props, children }: BaseComponentProps<AlertProps>) => (
      <AlertRoot {...u(props)}>{children}</AlertRoot>
    ),
    AlertTitle: ({ props }: BaseComponentProps<AlertTextSlotProps>) => {
      const { text, ...rest } = u(props);
      return <AlertTitleRoot {...rest}>{text}</AlertTitleRoot>;
    },
    AlertDescription: ({ props }: BaseComponentProps<AlertTextSlotProps>) => {
      const { text, ...rest } = u(props);
      return <AlertDescriptionRoot {...rest}>{text}</AlertDescriptionRoot>;
    },

    // ── Field composition ────────────────────────────────────────────────
    Field: ({ props, children }: BaseComponentProps<FieldProps>) => (
      <FieldRoot {...u(props)}>{children}</FieldRoot>
    ),
    FieldContent: ({ props, children }: BaseComponentProps<FieldContentProps>) => (
      <FieldContentRoot {...u(props)}>{children}</FieldContentRoot>
    ),
    FieldLabel: ({ props }: BaseComponentProps<FieldLabelProps>) => {
      const { text, ...rest } = u(props);
      return <FieldLabelRoot {...rest}>{text}</FieldLabelRoot>;
    },
    FieldDescription: ({ props }: BaseComponentProps<FieldDescriptionProps>) => {
      const { text, ...rest } = u(props);
      return <FieldDescriptionRoot {...rest}>{text}</FieldDescriptionRoot>;
    },
    FieldError: ({ props }: BaseComponentProps<FieldErrorProps>) => {
      const { text, ...rest } = u(props);
      return <FieldErrorRoot {...rest}>{text}</FieldErrorRoot>;
    },
    FieldGroup: ({ props, children }: BaseComponentProps<FieldGroupProps>) => (
      <FieldGroupRoot {...u(props)}>{children}</FieldGroupRoot>
    ),
    FieldSet: ({ props, children }: BaseComponentProps<FieldSetProps>) => (
      <FieldSetRoot {...u(props)}>{children}</FieldSetRoot>
    ),
    FieldLegend: ({ props }: BaseComponentProps<FieldLegendProps>) => {
      const { text, ...rest } = u(props);
      return <FieldLegendRoot {...rest}>{text}</FieldLegendRoot>;
    },
    FieldTitle: ({ props }: BaseComponentProps<FieldTitleProps>) => {
      const { text, ...rest } = u(props);
      return <FieldTitleRoot {...rest}>{text}</FieldTitleRoot>;
    },
    FieldSeparator: ({ props }: BaseComponentProps<FieldSeparatorProps>) => {
      const { text, ...rest } = u(props);
      return <FieldSeparatorRoot {...rest}>{text || undefined}</FieldSeparatorRoot>;
    },

    // ── Accordion ────────────────────────────────────────────────────────────
    Accordion: ({ props, children }: BaseComponentProps<AccordionProps>) => (
      <AccordionRoot {...u(props)}>{children}</AccordionRoot>
    ),
    AccordionItem: ({ props, children }: BaseComponentProps<AccordionItemProps>) => {
      const { open, ...rest } = u(props);
      return <AccordionItemRoot {...rest} open={open}>{children}</AccordionItemRoot>;
    },
    AccordionTrigger: ({ props }: BaseComponentProps<AccordionTriggerProps>) => {
      const { text, ...rest } = u(props);
      return <AccordionTriggerRoot {...rest}>{text}</AccordionTriggerRoot>;
    },
    AccordionContent: ({ props }: BaseComponentProps<AccordionContentProps>) => {
      const { text, ...rest } = u(props);
      return <AccordionContentRoot {...rest}>{text}</AccordionContentRoot>;
    },

    // ── Breadcrumb ───────────────────────────────────────────────────────────
    Breadcrumb: ({ props, children }: BaseComponentProps<BreadcrumbProps>) => (
      <BreadcrumbRoot {...u(props)}>{children}</BreadcrumbRoot>
    ),
    BreadcrumbList: ({ props, children }: BaseComponentProps<BreadcrumbListProps>) => (
      <BreadcrumbListRoot {...u(props)}>{children}</BreadcrumbListRoot>
    ),
    BreadcrumbItem: ({ props, children }: BaseComponentProps<BreadcrumbItemProps>) => (
      <BreadcrumbItemRoot {...u(props)}>{children}</BreadcrumbItemRoot>
    ),
    BreadcrumbLink: ({ props }: BaseComponentProps<BreadcrumbLinkProps>) => {
      const { text, ...rest } = u(props);
      return <BreadcrumbLinkRoot {...rest}>{text}</BreadcrumbLinkRoot>;
    },
    BreadcrumbPage: ({ props }: BaseComponentProps<BreadcrumbPageProps>) => {
      const { text, ...rest } = u(props);
      return <BreadcrumbPageRoot {...rest}>{text}</BreadcrumbPageRoot>;
    },
    BreadcrumbSeparator: ({ props }: BaseComponentProps<BreadcrumbSeparatorProps>) => (
      <BreadcrumbSeparatorRoot {...u(props)} />
    ),

    // ── Pagination ───────────────────────────────────────────────────────────
    Pagination: ({ props, children }: BaseComponentProps<PaginationProps>) => (
      <PaginationRoot {...u(props)}>{children}</PaginationRoot>
    ),
    PaginationContent: ({ props, children }: BaseComponentProps<PaginationContentProps>) => (
      <PaginationContentRoot {...u(props)}>{children}</PaginationContentRoot>
    ),
    PaginationItem: ({ props, children }: BaseComponentProps<PaginationItemProps>) => (
      <PaginationItemRoot {...u(props)}>{children}</PaginationItemRoot>
    ),
    PaginationLink: ({ props }: BaseComponentProps<PaginationLinkProps>) => {
      const { text, isActive, ...rest } = u(props);
      return <PaginationLinkRoot {...rest} isActive={isActive ?? false}>{text}</PaginationLinkRoot>;
    },

    // ── RadioGroup ───────────────────────────────────────────────────────────
    RadioGroup: ({ props, children }: BaseComponentProps<RadioGroupProps>) => (
      <RadioGroupRoot {...u(props)}>{children}</RadioGroupRoot>
    ),
    RadioGroupItem: ({ props }: BaseComponentProps<RadioGroupItemProps>) => (
      <RadioGroupItemRoot {...u(props)} />
    ),

    // ── Tabs ─────────────────────────────────────────────────────────────────
    Tabs: ({ props, children }: BaseComponentProps<TabsProps>) => (
      <TabsRoot {...u(props)} defaultValue={props.defaultValue}>{children}</TabsRoot>
    ),
    TabsList: ({ props, children }: BaseComponentProps<TabsListProps>) => (
      <TabsListRoot {...u(props)}>{children}</TabsListRoot>
    ),
    TabsTrigger: ({ props, children }: BaseComponentProps<TabsTriggerProps>) => (
      <TabsTriggerRoot {...u(props)} value={props.value}>{children}</TabsTriggerRoot>
    ),
    TabsContent: ({ props, children }: BaseComponentProps<TabsContentProps>) => (
      <TabsContentRoot {...u(props)} value={props.value}>{children}</TabsContentRoot>
    ),
  },
});
