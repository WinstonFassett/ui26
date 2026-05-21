export type Framework = "react" | "svelte" | "astro";

export interface RegistryFile {
  path: string;
  type: "registry:ui" | "registry:lib" | "registry:file" | "registry:example" | "registry:block";
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

const ALERT_SUBS = ["title", "description"] as const;
const AVATAR_SUBS = ["image", "fallback"] as const;
const ACCORDION_SUBS = ["item", "trigger", "content"] as const;
const BREADCRUMB_SUBS = ["list", "item", "link", "page", "separator"] as const;
const PAGINATION_SUBS = ["content", "item", "link"] as const;
const RADIO_GROUP_SUBS = ["item"] as const;
const FIELD_SUBS = [
  "content",
  "label",
  "description",
  "error",
  "group",
  "set",
  "legend",
  "title",
  "separator",
] as const;

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
  {
    name: "alert",
    title: "Alert",
    description: "Contextual feedback banner with AlertTitle and AlertDescription subcomponents.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "avatar",
    title: "Avatar",
    description: "User identity avatar with AvatarImage and AvatarFallback subcomponents.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "skeleton",
    title: "Skeleton",
    description: "Pulsing loading placeholder. Compose with width/height utilities.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "progress",
    title: "Progress",
    description: "Progress bar with value/max props and variant axis.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "accordion",
    title: "Accordion",
    description: "Collapsible sections via native details/summary. Zero JS.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "slider",
    title: "Slider",
    description: "Native range input styled with accent-primary.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "toggle",
    title: "Toggle",
    description: "Button with aria-pressed state and pressed/unpressed variant styles.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "breadcrumb",
    title: "Breadcrumb",
    description: "Navigation trail: BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "pagination",
    title: "Pagination",
    description: "Page navigation: PaginationContent, PaginationItem, PaginationLink.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "radio-group",
    title: "Radio Group",
    description: "Native radio group with RadioGroupItem. Fully accessible via browser behavior.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "stack",
    title: "Stack",
    description: "Flex container with direction, gap, alignment, and wrap variants.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "grid",
    title: "Grid",
    description: "CSS grid container with cols and gap variants.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "heading",
    title: "Heading",
    description: "Semantic heading h1–h4 with canonical type scale.",
    dependencies: BASE_DEPS,
    registryDependencies: BASE_REGISTRY_DEPS,
  },
  {
    name: "field",
    title: "Field",
    description: "Composition primitive: Field + FieldLabel/FieldContent/FieldDescription/FieldError/FieldGroup/FieldSet/FieldLegend/FieldTitle/FieldSeparator. Wraps any control.",
    dependencies: BASE_DEPS,
    registryDependencies: [...BASE_REGISTRY_DEPS, "label", "separator"],
  },
  {
    name: "tooltip",
    title: "Tooltip",
    description: "Hover tooltip with open/close delay, Floating UI positioning, and Matchina state machine. React (compound) and Svelte (single-file).",
    dependencies: [...BASE_DEPS, "matchina", "@floating-ui/dom"],
    registryDependencies: BASE_REGISTRY_DEPS,
  },
];

export function filesFor(name: string, fw: Framework): RegistryFile[] {
  const ext = EXT[fw];

  function withSubs(subs: readonly string[]): RegistryFile[] {
    const files: RegistryFile[] = [
      { path: `${name}/${name}.${ext}`, type: "registry:ui" },
      { path: `${name}/${name}.tv.ts`, type: "registry:ui" },
    ];
    if (fw !== "react") {
      for (const sub of subs) {
        files.push({ path: `${name}/${name}-${sub}.${ext}`, type: "registry:ui" });
      }
    }
    return files;
  }

  if (name === "card") return withSubs(CARD_SUBS);
  if (name === "alert") return withSubs(ALERT_SUBS);
  if (name === "avatar") return withSubs(AVATAR_SUBS);
  if (name === "accordion") return withSubs(ACCORDION_SUBS);
  if (name === "breadcrumb") return withSubs(BREADCRUMB_SUBS);
  if (name === "pagination") return withSubs(PAGINATION_SUBS);
  if (name === "radio-group") return withSubs(RADIO_GROUP_SUBS);
  if (name === "field") return withSubs(FIELD_SUBS);

  if (name === "tooltip") return [
    { path: `${name}/${name}.${ext}`, type: "registry:ui" },
    { path: `${name}/${name}.tv.ts`, type: "registry:ui" },
    { path: `${name}/${name}.state.ts`, type: "registry:ui" },
  ];

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

