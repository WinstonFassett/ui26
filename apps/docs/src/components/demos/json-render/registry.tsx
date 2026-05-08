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
import { Input } from "@registry/input/input.tsx";
import { Textarea } from "@registry/textarea/textarea.tsx";
import { Label } from "@registry/label/label.tsx";
import { Checkbox } from "@registry/checkbox/checkbox.tsx";
import { Switch } from "@registry/switch/switch.tsx";
import { Separator as Sep } from "@registry/separator/separator.tsx";
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
  type InputFieldProps,
  type TextareaFieldProps,
  type CheckboxFieldProps,
  type SwitchFieldProps,
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

    // ── Form fields — composite (label + control + helper/error). ──
    InputField: ({ props }: BaseComponentProps<InputFieldProps>) => (
      <div className={cn("flex flex-col gap-1.5", props.className)}>
        <Label htmlFor={props.id ?? undefined}>{props.label}</Label>
        <Input
          id={props.id ?? undefined}
          type={props.type ?? "text"}
          placeholder={props.placeholder ?? undefined}
          defaultValue={props.value ?? undefined}
          aria-invalid={props.error ? true : undefined}
        />
        {props.helper && <p className="font-mono text-[10px] text-muted-foreground">{props.helper}</p>}
        {props.error && <p className="text-[11px] text-destructive">{props.error}</p>}
      </div>
    ),

    TextareaField: ({ props }: BaseComponentProps<TextareaFieldProps>) => (
      <div className={cn("flex flex-col gap-1.5", props.className)}>
        <Label htmlFor={props.id ?? undefined}>{props.label}</Label>
        <Textarea
          id={props.id ?? undefined}
          placeholder={props.placeholder ?? undefined}
          rows={props.rows ?? 4}
          defaultValue={props.value ?? undefined}
        />
        {props.helper && <p className="font-mono text-[10px] text-muted-foreground self-end">{props.helper}</p>}
      </div>
    ),

    CheckboxField: ({ props }: BaseComponentProps<CheckboxFieldProps>) => (
      <label className={cn("flex items-start gap-2.5 cursor-pointer", props.disabled && "opacity-50", props.className)}>
        <Checkbox className="mt-0.5" defaultChecked={props.checked ?? false} disabled={props.disabled ?? false} />
        <span>
          <span className="block text-[13px] text-foreground leading-snug">{props.label}</span>
          {props.description && (
            <span className="block text-[11px] text-muted-foreground mt-0.5">{props.description}</span>
          )}
        </span>
      </label>
    ),

    SwitchField: ({ props }: BaseComponentProps<SwitchFieldProps>) => (
      <label className={cn("flex items-start gap-3 cursor-pointer", props.className)}>
        <Switch defaultChecked={props.checked ?? false} />
        <span>
          <span className="block text-[13px] text-foreground leading-snug">{props.label}</span>
          {props.description && (
            <span className="block text-[11px] text-muted-foreground mt-0.5">{props.description}</span>
          )}
        </span>
      </label>
    ),
  },
});
