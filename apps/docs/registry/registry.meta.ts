export type Framework = "react" | "svelte" | "astro";

export interface RegistryFile {
  path: string;
  type: "registry:ui" | "registry:lib" | "registry:file";
}

export interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
}

export const FRAMEWORKS: Framework[] = ["react", "svelte", "astro"];

const EXT: Record<Framework, string> = {
  react: "tsx",
  svelte: "svelte",
  astro: "astro",
};

const CARD_SUBS = ["header", "title", "description", "content", "footer"] as const;

const BASE_DEPS = ["tailwind-variants"];
const BASE_REGISTRY_DEPS = ["utils"];

export const COMPONENTS: ComponentMeta[] = [
  {
    name: "button",
    title: "Button",
    description: "Polyglot button with variant and size axes, driven by shared tailwind-variants.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "badge",
    title: "Badge",
    description: "Polyglot status/label badge.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "input",
    title: "Input",
    description: "Polyglot text input with aria-invalid error state.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "label",
    title: "Label",
    description: "Polyglot form label.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "textarea",
    title: "Textarea",
    description: "Polyglot multi-line text input.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "card",
    title: "Card",
    description: "Polyglot card with Header/Title/Description/Content/Footer subcomponents.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "checkbox",
    title: "Checkbox",
    description: "Polyglot checkbox using native <input type=checkbox>.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "switch",
    title: "Switch",
    description: "Polyglot switch built on a visually-hidden native checkbox.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "separator",
    title: "Separator",
    description: "Polyglot horizontal or vertical separator.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
];

export function filesFor(name: string, fw: Framework): RegistryFile[] {
  const ext = EXT[fw];
  if (name === "card") {
    const files: RegistryFile[] = [
      { path: `card/card.${ext}`, type: "registry:ui" },
      { path: `card/card.tv.ts`, type: "registry:ui" },
    ];
    if (fw !== "react") {
      for (const sub of CARD_SUBS) {
        files.push({ path: `card/card-${sub}.${ext}`, type: "registry:ui" });
      }
    }
    return files;
  }
  return [
    { path: `${name}/${name}.${ext}`, type: "registry:ui" },
    { path: `${name}/${name}.tv.ts`, type: "registry:ui" },
  ];
}

export const UTILS_ITEM = {
  name: "utils",
  type: "registry:lib" as const,
  title: "cn utility",
  description: "Shared cn() className merger (clsx + tailwind-merge).",
  dependencies: ["clsx", "tailwind-merge"],
  files: [{ path: "lib/utils.ts", type: "registry:lib" as const }],
};

