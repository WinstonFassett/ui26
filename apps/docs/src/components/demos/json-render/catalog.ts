import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { z } from "zod";

// ─── primitive prop schemas ────────────────────────────────────────────────

const buttonProps = z.object({
  label: z.string(),
  variant: z.enum(["default", "destructive", "outline", "secondary", "ghost"]).nullable(),
  size: z.enum(["default", "sm", "lg", "icon"]).nullable(),
  disabled: z.boolean().nullable(),
  className: z.string().nullable(),
});

const badgeProps = z.object({
  text: z.string(),
  variant: z.enum(["default", "secondary", "destructive", "outline", "ghost"]).nullable(),
  className: z.string().nullable(),
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
  className: z.string().nullable(),
});

const headingProps = z.object({
  text: z.string(),
  level: z.enum(["h1", "h2", "h3", "h4"]).nullable(),
  className: z.string().nullable(),
});

const cardProps = z.object({
  className: z.string().nullable(),
});

const cardSlotProps = z.object({
  className: z.string().nullable(),
});

const cardTextSlotProps = z.object({
  text: z.string(),
  className: z.string().nullable(),
});

const cardFooterProps = z.object({
  className: z.string().nullable(),
});

const separatorProps = z.object({
  orientation: z.enum(["horizontal", "vertical"]).nullable(),
  className: z.string().nullable(),
});

// ── Bare controls (compose inside Field) ──────────────────────────────────

const inputProps = z.object({
  id: z.string().nullable(),
  type: z.enum(["text", "email", "password", "number", "search", "file"]).nullable(),
  placeholder: z.string().nullable(),
  value: z.string().nullable(),
  invalid: z.boolean().nullable(),
  disabled: z.boolean().nullable(),
  className: z.string().nullable(),
});

const textareaProps = z.object({
  id: z.string().nullable(),
  placeholder: z.string().nullable(),
  value: z.string().nullable(),
  rows: z.number().nullable(),
  invalid: z.boolean().nullable(),
  disabled: z.boolean().nullable(),
  className: z.string().nullable(),
});

const labelProps = z.object({
  text: z.string(),
  htmlFor: z.string().nullable(),
  className: z.string().nullable(),
});

const alertProps = z.object({
  variant: z.enum(["default", "destructive", "warning", "success"]).nullable(),
  className: z.string().nullable(),
});

const alertTextSlotProps = z.object({
  text: z.string(),
  className: z.string().nullable(),
});

const checkboxProps = z.object({
  id: z.string().nullable(),
  checked: z.boolean().nullable(),
  disabled: z.boolean().nullable(),
  className: z.string().nullable(),
});

const switchControlProps = z.object({
  id: z.string().nullable(),
  checked: z.boolean().nullable(),
  disabled: z.boolean().nullable(),
  className: z.string().nullable(),
});

// ── Field family (composition primitive — wraps any control) ─────────────

const fieldProps = z.object({
  orientation: z.enum(["vertical", "horizontal", "responsive"]).nullable(),
  className: z.string().nullable(),
});

const fieldContentProps = z.object({
  className: z.string().nullable(),
});

const fieldLabelProps = z.object({
  text: z.string(),
  htmlFor: z.string().nullable(),
  className: z.string().nullable(),
});

const fieldDescriptionProps = z.object({
  text: z.string(),
  className: z.string().nullable(),
});

const fieldErrorProps = z.object({
  text: z.string(),
  className: z.string().nullable(),
});

const fieldGroupProps = z.object({
  className: z.string().nullable(),
});

const fieldSetProps = z.object({
  className: z.string().nullable(),
});

const fieldLegendProps = z.object({
  text: z.string(),
  variant: z.enum(["legend", "label"]).nullable(),
  className: z.string().nullable(),
});

const fieldTitleProps = z.object({
  text: z.string(),
  className: z.string().nullable(),
});

const fieldSeparatorProps = z.object({
  text: z.string().nullable(),
  className: z.string().nullable(),
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
      description: "Card container. Pass-through; compose with CardHeader/CardContent/CardFooter.",
    },
    CardHeader: {
      props: cardSlotProps,
      slots: ["default"],
      description: "Card header row. Wraps CardTitle and CardDescription.",
    },
    CardTitle: {
      props: cardTextSlotProps,
      slots: [],
      description: "Card heading.",
    },
    CardDescription: {
      props: cardTextSlotProps,
      slots: [],
      description: "Card subheading.",
    },
    CardContent: {
      props: cardSlotProps,
      slots: ["default"],
      description: "Card body region.",
    },
    CardFooter: {
      props: cardFooterProps,
      slots: ["default"],
      description: "Card footer row with top border.",
    },
    // bare form controls — compose inside Field
    Input: {
      props: inputProps,
      slots: [],
      description: "Bare text input. Wrap in Field for label/description/error.",
      example: { type: "email", placeholder: "you@company.com" },
    },
    Textarea: {
      props: textareaProps,
      slots: [],
      description: "Bare multi-line input. Wrap in Field for label/helper.",
      example: { rows: 4 },
    },
    Checkbox: {
      props: checkboxProps,
      slots: [],
      description: "Bare checkbox. Wrap in Field for label/description.",
      example: { checked: true },
    },
    Switch: {
      props: switchControlProps,
      slots: [],
      description: "Bare toggle switch. Wrap in Field for label/description.",
      example: { checked: false },
    },
    Label: {
      props: labelProps,
      slots: [],
      description: "Form label. Use htmlFor to bind to a control id.",
      example: { text: "Email" },
    },
    // alert family
    Alert: {
      props: alertProps,
      slots: ["default"],
      description: "Contextual feedback banner. Compose with AlertTitle and AlertDescription.",
      example: { variant: "default" },
    },
    AlertTitle: {
      props: alertTextSlotProps,
      slots: [],
      description: "Heading for an Alert.",
    },
    AlertDescription: {
      props: alertTextSlotProps,
      slots: [],
      description: "Body copy for an Alert.",
    },
    // field composition family — wraps any control with label/description/error
    Field: {
      props: fieldProps,
      slots: ["default"],
      description: "Composition wrapper for a labeled form control.",
      example: { orientation: "vertical" },
    },
    FieldContent: {
      props: fieldContentProps,
      slots: ["default"],
      description: "Inner content column inside a Field — groups label + helper alongside a control.",
    },
    FieldLabel: {
      props: fieldLabelProps,
      slots: [],
      description: "Label slot inside a Field. Use htmlFor to bind to a control id.",
    },
    FieldDescription: {
      props: fieldDescriptionProps,
      slots: [],
      description: "Helper text below a control inside a Field.",
    },
    FieldError: {
      props: fieldErrorProps,
      slots: [],
      description: "Error message inside a Field. Renders only when text is provided.",
    },
    FieldGroup: {
      props: fieldGroupProps,
      slots: ["default"],
      description: "Container that groups multiple Fields with consistent vertical rhythm.",
    },
    FieldSet: {
      props: fieldSetProps,
      slots: ["default"],
      description: "Semantic <fieldset> for grouping related controls. Pair with FieldLegend.",
    },
    FieldLegend: {
      props: fieldLegendProps,
      slots: [],
      description: "Legend heading for a FieldSet. Variant 'legend' (base) or 'label' (sm).",
    },
    FieldTitle: {
      props: fieldTitleProps,
      slots: [],
      description: "Bold inline title for a Field — use when no <Label> is appropriate.",
    },
    FieldSeparator: {
      props: fieldSeparatorProps,
      slots: [],
      description: "Horizontal divider between fields, optionally labeled with text.",
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
export type CardSlotProps     = z.output<typeof cardSlotProps>;
export type CardTextSlotProps = z.output<typeof cardTextSlotProps>;
export type CardFooterProps   = z.output<typeof cardFooterProps>;
export type SeparatorProps          = z.output<typeof separatorProps>;
export type InputProps              = z.output<typeof inputProps>;
export type TextareaProps           = z.output<typeof textareaProps>;
export type CheckboxProps           = z.output<typeof checkboxProps>;
export type SwitchControlProps      = z.output<typeof switchControlProps>;
export type LabelProps              = z.output<typeof labelProps>;
export type AlertProps              = z.output<typeof alertProps>;
export type AlertTextSlotProps      = z.output<typeof alertTextSlotProps>;
export type FieldProps              = z.output<typeof fieldProps>;
export type FieldContentProps       = z.output<typeof fieldContentProps>;
export type FieldLabelProps         = z.output<typeof fieldLabelProps>;
export type FieldDescriptionProps   = z.output<typeof fieldDescriptionProps>;
export type FieldErrorProps         = z.output<typeof fieldErrorProps>;
export type FieldGroupProps         = z.output<typeof fieldGroupProps>;
export type FieldSetProps           = z.output<typeof fieldSetProps>;
export type FieldLegendProps        = z.output<typeof fieldLegendProps>;
export type FieldTitleProps         = z.output<typeof fieldTitleProps>;
export type FieldSeparatorProps     = z.output<typeof fieldSeparatorProps>;
