"use client";

import { useState } from "react";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/kibo-ui/code-block";

const files = [
  {
    language: "sh",
    filename: "install.sh",
    code: `pnpm add class-variance-authority
npx shadcn@latest add https://www.kibo-ui.com/r/tags.json --yes`,
  },
  {
    language: "tsx",
    filename: "tags-demo.tsx",
    code: `import { useState } from "react";
import {
  Tags, TagsContent, TagsInput, TagsItem,
  TagsList, TagsTrigger, TagsValue,
} from "@/components/kibo-ui/tags";

const ALL = ["spike", "epic", "bug", "feature"];

export function Picker() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <Tags>
      <TagsTrigger>
        {selected.map((t) => (
          <TagsValue key={t}>{t}</TagsValue>
        ))}
      </TagsTrigger>
      <TagsContent>
        <TagsInput placeholder="Search tags..." />
        <TagsList>
          {ALL.map((t) => (
            <TagsItem key={t} value={t}>{t}</TagsItem>
          ))}
        </TagsList>
      </TagsContent>
    </Tags>
  );
}`,
  },
  {
    language: "css",
    filename: "tokens.css",
    code: `:root {
  --background: oklch(0.99 0.005 80);
  --foreground: oklch(0.20 0.03 260);
  --accent: oklch(0.76 0.16 60);
  --border: oklch(0.88 0.01 80);
  --radius: 6px;
}

[data-theme="editorial-dark"] {
  --background: oklch(0.14 0.02 260);
  --foreground: oklch(0.95 0.02 80);
}`,
  },
];

export function CodeBlockDemo() {
  const [value, setValue] = useState("tsx");
  return (
    <CodeBlock data={files} value={value} onValueChange={setValue}>
      <CodeBlockHeader>
        <CodeBlockFiles>
          {(file) => (
            <button
              key={file.language}
              type="button"
              onClick={() => setValue(file.language)}
              className={`px-3 py-1 text-xs font-mono border-b-2 transition-colors ${
                file.language === value
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {file.filename}
            </button>
          )}
        </CodeBlockFiles>
        <div className="flex-1" />
        <CodeBlockCopyButton />
      </CodeBlockHeader>
      <CodeBlockBody>
        {(file) => (
          <CodeBlockItem key={file.language} value={file.language}>
            <CodeBlockContent language={file.language as "tsx"}>
              {file.code}
            </CodeBlockContent>
          </CodeBlockItem>
        )}
      </CodeBlockBody>
    </CodeBlock>
  );
}
