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

export const { registry } = defineRegistry(catalog, {
  components: {
    // ── Layout (wrappers around real ui26 components) ─────────────────────
    Stack: ({ props, children }: BaseComponentProps<StackProps>) => (
      <StackRoot
        direction={props.direction ?? undefined}
        gap={props.gap ?? undefined}
        align={props.align ?? undefined}
        justify={props.justify ?? undefined}
        wrap={props.wrap ?? undefined}
        className={props.className ?? undefined}
      >
        {children}
      </StackRoot>
    ),

    Grid: ({ props, children }: BaseComponentProps<GridProps>) => (
      <GridRoot
        cols={props.cols ?? undefined}
        gap={props.gap ?? undefined}
        className={props.className ?? undefined}
      >
        {children}
      </GridRoot>
    ),

    // ── Typography ────────────────────────────────────────────────────────
    Heading: ({ props }: BaseComponentProps<HeadingProps>) => (
      <HeadingRoot
        level={props.level ?? undefined}
        className={props.className ?? undefined}
      >
        {props.text}
      </HeadingRoot>
    ),

    // Text is Spec-only — lowers to <p className="..."> in generated source.
    Text: ({ props }: BaseComponentProps<TextProps>) => {
      const cn_ = props.className ?? "";
      const cnHasTextSize = /(^|\s)text-(\[|2xs|xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)(\s|$)/.test(cn_);
      return (
        <p
          className={cn(
            props.size ? `text-${props.size}` : !cnHasTextSize && "text-sm",
            props.muted && "text-muted-foreground",
            props.mono && "font-mono",
            cn_,
          )}
        >
          {props.content}
        </p>
      );
    },

    // ── Actions ───────────────────────────────────────────────────────────
    Button: ({ props, emit }: BaseComponentProps<ButtonProps>) => (
      <Btn
        variant={props.variant ?? "default"}
        size={props.size ?? "default"}
        disabled={props.disabled ?? false}
        className={props.className ?? undefined}
        onClick={() => emit("press")}
      >
        {props.label}
      </Btn>
    ),

    Badge: ({ props }: BaseComponentProps<BadgeProps>) => (
      <Bdg
        variant={props.variant ?? "default"}
        className={props.className ?? undefined}
      >
        {props.text}
      </Bdg>
    ),

    // ── Card ──────────────────────────────────────────────────────────────
    Card: ({ props, children }: BaseComponentProps<CardProps>) => (
      <CardRoot className={props.className ?? undefined}>{children}</CardRoot>
    ),

    CardHeader: ({ props, children }: BaseComponentProps<CardSlotProps>) => (
      <CardHeaderRoot className={props.className ?? undefined}>{children}</CardHeaderRoot>
    ),

    CardTitle: ({ props }: BaseComponentProps<CardTextSlotProps>) => (
      <CardTitleRoot className={props.className ?? undefined}>{props.text}</CardTitleRoot>
    ),

    CardDescription: ({ props }: BaseComponentProps<CardTextSlotProps>) => (
      <CardDescriptionRoot className={props.className ?? undefined}>{props.text}</CardDescriptionRoot>
    ),

    CardContent: ({ props, children }: BaseComponentProps<CardSlotProps>) => (
      <CardContentRoot className={props.className ?? undefined}>{children}</CardContentRoot>
    ),

    CardFooter: ({ props, children }: BaseComponentProps<CardFooterProps>) => (
      <CardFooterRoot className={cn("mt-4 border-t border-border pt-4", props.className ?? undefined)}>
        {children}
      </CardFooterRoot>
    ),

    // ── Form fields ───────────────────────────────────────────────────────
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
        {props.helper && (
          <p className="font-mono text-[10px] text-muted-foreground">{props.helper}</p>
        )}
        {props.error && (
          <p className="text-[11px] text-destructive">{props.error}</p>
        )}
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
        {props.helper && (
          <p className="font-mono text-[10px] text-muted-foreground self-end">{props.helper}</p>
        )}
      </div>
    ),

    CheckboxField: ({ props }: BaseComponentProps<CheckboxFieldProps>) => (
      <label
        className={cn(
          "flex items-start gap-2.5 cursor-pointer",
          props.disabled && "opacity-50",
          props.className,
        )}
      >
        <Checkbox
          className="mt-0.5"
          defaultChecked={props.checked ?? false}
          disabled={props.disabled ?? false}
        />
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

    Separator: ({ props }: BaseComponentProps<SeparatorProps>) => (
      <Sep
        orientation={props.orientation ?? "horizontal"}
        className={props.className ?? undefined}
      />
    ),
  },
});
