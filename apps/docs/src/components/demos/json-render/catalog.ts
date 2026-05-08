import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { z } from "zod";

// ─── primitive prop schemas ────────────────────────────────────────────────

const buttonProps = z.object({
  label: z.string(),
  variant: z.enum(["default", "destructive", "outline", "secondary", "ghost", "link"]).nullable(),
  size: z.enum(["default", "sm", "lg", "xs", "icon"]).nullable(),
  disabled: z.boolean().nullable(),
});

const badgeProps = z.object({
  text: z.string(),
  variant: z.enum(["default", "secondary", "destructive", "outline", "ghost", "link"]).nullable(),
});

const stackProps = z.object({
  direction: z.enum(["row", "col"]).nullable(),
  gap: z.enum(["0", "1", "2", "3", "4", "5", "6", "8"]).nullable(),
  align: z.enum(["start", "center", "end", "stretch"]).nullable(),
  justify: z.enum(["start", "center", "end", "between"]).nullable(),
  wrap: z.boolean().nullable(),
  className: z.string().nullable(),
});

const gridProps = z.object({
  cols: z.enum(["2", "3", "4"]).nullable(),
  gap: z.enum(["2", "3", "4", "5", "6"]).nullable(),
  className: z.string().nullable(),
});

const textProps = z.object({
  content: z.string(),
  size: z.enum(["xs", "sm", "base", "lg", "xl"]).nullable(),
  muted: z.boolean().nullable(),
  mono: z.boolean().nullable(),
});

const headingProps = z.object({
  text: z.string(),
  level: z.enum(["h1", "h2", "h3", "h4"]).nullable(),
});

const cardProps = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  className: z.string().nullable(),
});

const cardFooterProps = z.object({
  className: z.string().nullable(),
});

const separatorProps = z.object({
  orientation: z.enum(["horizontal", "vertical"]).nullable(),
});

const inputFieldProps = z.object({
  label: z.string(),
  id: z.string().nullable(),
  type: z.enum(["text", "email", "password", "number", "search"]).nullable(),
  placeholder: z.string().nullable(),
  value: z.string().nullable(),
  helper: z.string().nullable(),
  error: z.string().nullable(),
});

const textareaFieldProps = z.object({
  label: z.string(),
  id: z.string().nullable(),
  placeholder: z.string().nullable(),
  value: z.string().nullable(),
  rows: z.number().nullable(),
  helper: z.string().nullable(),
});

const checkboxFieldProps = z.object({
  label: z.string(),
  description: z.string().nullable(),
  checked: z.boolean().nullable(),
  disabled: z.boolean().nullable(),
});

const switchFieldProps = z.object({
  label: z.string(),
  description: z.string().nullable(),
  checked: z.boolean().nullable(),
});

// ─── catalog ──────────────────────────────────────────────────────────────

export const catalog = defineCatalog(schema, {
  components: {
    // layout
    Stack: {
      props: stackProps,
      slots: ["default"],
      description: "Flex container.",
      example: { direction: "row", gap: "4" },
    },
    Grid: {
      props: gridProps,
      slots: ["default"],
      description: "CSS grid container.",
      example: { cols: "3", gap: "4" },
    },
    // typography
    Heading: {
      props: headingProps,
      slots: [],
      description: "Section heading h1–h4.",
      example: { text: "Welcome", level: "h2" },
    },
    Text: {
      props: textProps,
      slots: [],
      description: "Body text.",
      example: { content: "Hello world" },
    },
    // actions
    Button: {
      props: buttonProps,
      slots: [],
      description: "Clickable button. Emits press.",
      example: { label: "Click me", variant: "default" },
    },
    Badge: {
      props: badgeProps,
      slots: [],
      description: "Status badge.",
      example: { text: "New", variant: "default" },
    },
    // card
    Card: {
      props: cardProps,
      slots: ["default"],
      description: "Card container. Title/description render in the header.",
      example: { title: "My card" },
    },
    CardFooter: {
      props: cardFooterProps,
      slots: ["default"],
      description: "Card footer row with top border.",
    },
    // form fields
    InputField: {
      props: inputFieldProps,
      slots: [],
      description: "Label + input with optional helper/error.",
      example: { label: "Email", type: "email", placeholder: "you@example.com" },
    },
    TextareaField: {
      props: textareaFieldProps,
      slots: [],
      description: "Label + textarea with optional helper.",
      example: { label: "Description", rows: 4 },
    },
    CheckboxField: {
      props: checkboxFieldProps,
      slots: [],
      description: "Checkbox with label and optional description.",
      example: { label: "Enable streaming", checked: true },
    },
    SwitchField: {
      props: switchFieldProps,
      slots: [],
      description: "Toggle switch with label and optional description.",
      example: { label: "Dark mode", checked: false },
    },
    Separator: {
      props: separatorProps,
      slots: [],
      description: "Horizontal or vertical divider.",
    },
  },
  actions: {},
});

export type Ui26Catalog = typeof catalog;

// exported prop types for registry
export type ButtonProps       = z.output<typeof buttonProps>;
export type BadgeProps        = z.output<typeof badgeProps>;
export type StackProps        = z.output<typeof stackProps>;
export type GridProps         = z.output<typeof gridProps>;
export type TextProps         = z.output<typeof textProps>;
export type HeadingProps      = z.output<typeof headingProps>;
export type CardProps         = z.output<typeof cardProps>;
export type CardFooterProps   = z.output<typeof cardFooterProps>;
export type SeparatorProps    = z.output<typeof separatorProps>;
export type InputFieldProps   = z.output<typeof inputFieldProps>;
export type TextareaFieldProps = z.output<typeof textareaFieldProps>;
export type CheckboxFieldProps = z.output<typeof checkboxFieldProps>;
export type SwitchFieldProps  = z.output<typeof switchFieldProps>;
