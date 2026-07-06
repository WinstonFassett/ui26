import { tv, type VariantProps } from "tailwind-variants";

export const field = tv({
  base: "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  variants: {
    orientation: {
      vertical: "flex-col [&>*]:w-full [&>.sr-only]:w-auto",
      horizontal:
        "flex-row items-center [&>[data-slot=field-label]]:flex-auto has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      responsive:
        "flex-col @md/field-group:flex-row @md/field-group:items-center [&>*]:w-full @md/field-group:[&>*]:w-auto @md/field-group:[&>[data-slot=field-label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:items-start",
    },
  },
  defaultVariants: { orientation: "vertical" },
});

export const fieldContent = tv({
  base: "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
});

export const fieldLabel = tv({
  base: "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
});

export const fieldDescription = tv({
  base: "text-sm leading-normal font-normal text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
});

export const fieldError = tv({
  base: "text-sm font-normal text-destructive",
});

export const fieldGroup = tv({
  base:
    "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
});

export const fieldSet = tv({
  base:
    "flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
});

export const fieldLegend = tv({
  base: "mb-3 font-medium",
  variants: {
    variant: {
      legend: "text-base",
      label: "text-sm",
    },
  },
  defaultVariants: { variant: "legend" },
});

export const fieldTitle = tv({
  base:
    "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
});

export const fieldSeparator = tv({
  base:
    "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
});

export type FieldVariants = VariantProps<typeof field>;
export type FieldLegendVariants = VariantProps<typeof fieldLegend>;
