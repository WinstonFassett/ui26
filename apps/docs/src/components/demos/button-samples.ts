export type Framework = "react" | "svelte" | "astro";

export interface ButtonVariantDef {
  id: string;
  label: string;
  /** Attribute string to append to the component tag, e.g. `variant="ghost"` */
  props: string;
}

export interface ButtonSizeDef {
  id: string;
  label: string;
  props: string;
}

export const BUTTON_VARIANTS: ButtonVariantDef[] = [
  { id: "default", label: "Default", props: "" },
  { id: "secondary", label: "Secondary", props: 'variant="secondary"' },
  { id: "outline", label: "Outline", props: 'variant="outline"' },
  { id: "ghost", label: "Ghost", props: 'variant="ghost"' },
  { id: "destructive", label: "Destructive", props: 'variant="destructive"' },
];

export const BUTTON_SIZES: ButtonSizeDef[] = [
  { id: "sm", label: "sm", props: 'size="sm"' },
  { id: "default", label: "default", props: "" },
  { id: "lg", label: "lg", props: 'size="lg"' },
  { id: "icon", label: "icon", props: 'size="icon"' },
];

const IMPORTS: Record<Framework, string> = {
  react: `import { Button } from "@/components/ui/button"`,
  svelte: `import { Button } from "$lib/components/ui/button"`,
  astro: `import { Button } from "@/components/ui/button"`,
};

export function genButtonCode(
  label: string,
  propStr: string,
  fw: Framework
): string {
  const propsAttr = propStr ? ` ${propStr}` : "";
  const imp = IMPORTS[fw];

  if (fw === "react") {
    return `${imp}

export function Demo() {
  return <Button${propsAttr}>${label}</Button>
}`;
  }

  if (fw === "svelte") {
    return `<script lang="ts">
  ${imp};
</script>

<Button${propsAttr}>${label}</Button>`;
  }

  // astro
  return `---
${imp};
---

<Button${propsAttr}>${label}</Button>`;
}

export interface CodeFile {
  language: string;
  filename: string;
  code: string;
}

export function genButtonFiles(
  label: string,
  propStr: string
): Record<Framework, CodeFile> {
  return {
    react: {
      language: "tsx",
      filename: "demo.tsx",
      code: genButtonCode(label, propStr, "react"),
    },
    svelte: {
      language: "svelte",
      filename: "Demo.svelte",
      code: genButtonCode(label, propStr, "svelte"),
    },
    astro: {
      language: "astro",
      filename: "Demo.astro",
      code: genButtonCode(label, propStr, "astro"),
    },
  };
}

export const FRAMEWORKS: Framework[] = ["react", "svelte", "astro"];

export const FRAMEWORK_LABELS: Record<Framework, string> = {
  react: "React",
  svelte: "Svelte",
  astro: "Astro",
};
