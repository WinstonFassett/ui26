"use client";

import { defineRegistry, type BaseComponentProps } from "@json-render/react";
import { cn } from "@/lib/utils";
import { Button as Btn } from "@registry/button/button.tsx";
import { Badge as Bdg } from "@registry/badge/badge.tsx";
import {
  Card as CardRoot,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter as CardFooterRoot,
} from "@registry/card/card.tsx";
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
  type CardFooterProps,
  type SeparatorProps,
  type InputFieldProps,
  type TextareaFieldProps,
  type CheckboxFieldProps,
  type SwitchFieldProps,
} from "./catalog";

const gapMap: Record<string, string> = {
  "0": "gap-0", "1": "gap-1", "2": "gap-2", "3": "gap-3",
  "4": "gap-4", "5": "gap-5", "6": "gap-6", "8": "gap-8",
};

export const { registry } = defineRegistry(catalog, {
  components: {
    // ── Layout ────────────────────────────────────────────────────────────
    Stack: ({ props, children }: BaseComponentProps<StackProps>) => (
      <div
        className={cn(
          "flex",
          props.direction === "row" ? "flex-row" : "flex-col",
          props.gap ? gapMap[props.gap] : "gap-4",
          props.align === "center" && "items-center",
          props.align === "end"    && "items-end",
          props.align === "start"  && "items-start",
          props.align === "stretch" && "items-stretch",
          props.justify === "between" && "justify-between",
          props.justify === "center"  && "justify-center",
          props.justify === "end"     && "justify-end",
          props.wrap && "flex-wrap",
          props.className,
        )}
      >
        {children}
      </div>
    ),

    Grid: ({ props, children }: BaseComponentProps<GridProps>) => (
      <div
        className={cn(
          "grid",
          props.cols === "2" && "grid-cols-2",
          props.cols === "3" && "grid-cols-3",
          props.cols === "4" && "grid-cols-4",
          props.gap ? gapMap[props.gap] : "gap-4",
          props.className,
        )}
      >
        {children}
      </div>
    ),

    // ── Typography ────────────────────────────────────────────────────────
    Heading: ({ props }: BaseComponentProps<HeadingProps>) => {
      const Tag = (props.level ?? "h2") as "h1" | "h2" | "h3" | "h4";
      const sizeMap = {
        h1: "text-3xl font-bold tracking-tight",
        h2: "text-2xl font-semibold tracking-tight",
        h3: "text-xl font-semibold",
        h4: "text-lg font-medium",
      } as const;
      return <Tag className={sizeMap[Tag]}>{props.text}</Tag>;
    },

    Text: ({ props }: BaseComponentProps<TextProps>) => (
      <p
        className={cn(
          props.size ? `text-${props.size}` : "text-sm",
          props.muted && "text-muted-foreground",
          props.mono && "font-mono",
        )}
      >
        {props.content}
      </p>
    ),

    // ── Actions ───────────────────────────────────────────────────────────
    Button: ({ props, emit }: BaseComponentProps<ButtonProps>) => (
      <Btn
        variant={props.variant ?? "default"}
        size={props.size ?? "default"}
        disabled={props.disabled ?? false}
        onClick={() => emit("press")}
      >
        {props.label}
      </Btn>
    ),

    Badge: ({ props }: BaseComponentProps<BadgeProps>) => (
      <Bdg variant={props.variant ?? "default"}>{props.text}</Bdg>
    ),

    // ── Card ──────────────────────────────────────────────────────────────
    Card: ({ props, children }: BaseComponentProps<CardProps>) => (
      <CardRoot className={props.className ?? undefined}>
        {(props.title || props.description) && (
          <CardHeader>
            {props.title && <CardTitle>{props.title}</CardTitle>}
            {props.description && <CardDescription>{props.description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
      </CardRoot>
    ),

    CardFooter: ({ props, children }: BaseComponentProps<CardFooterProps>) => (
      <CardFooterRoot className={cn("mt-4 border-t border-border pt-4", props.className ?? undefined)}>
        {children}
      </CardFooterRoot>
    ),

    // ── Form fields ───────────────────────────────────────────────────────
    InputField: ({ props }: BaseComponentProps<InputFieldProps>) => (
      <div className="flex flex-col gap-1.5">
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
      <div className="flex flex-col gap-1.5">
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
      <label className="flex items-start gap-3 cursor-pointer">
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
      <Sep orientation={props.orientation ?? "horizontal"} />
    ),
  },
});
