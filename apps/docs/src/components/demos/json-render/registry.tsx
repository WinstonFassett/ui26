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
} from "./catalog";

// Catalog uses .nullable() so unset Spec props serialize as JSON `null`.
// React props expect undefined for unset, so coerce at the registry boundary.
function u<T extends Record<string, unknown>>(props: T): { [K in keyof T]: Exclude<T[K], null> | undefined } {
  const out: Record<string, unknown> = {};
  for (const k in props) out[k] = props[k] === null ? undefined : props[k];
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
  },
});
