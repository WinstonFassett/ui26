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

export type FieldVariants = VariantProps<typeof field>;
