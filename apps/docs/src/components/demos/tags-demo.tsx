"use client";

import { useState } from "react";
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from "@/components/kibo-ui/tags";

const ALL_TAGS = [
  "spike",
  "epic",
  "bug",
  "feature",
  "docs",
  "refactor",
  "infra",
  "compat",
  "polyglot",
  "registry",
  "tokens",
  "react",
  "svelte",
  "astro",
];

export function TagsDemo() {
  const [selected, setSelected] = useState<string[]>(["spike", "compat"]);

  const toggle = (t: string) => {
    setSelected((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const remove = (t: string) => setSelected((prev) => prev.filter((x) => x !== t));

  return (
    <div className="max-w-md">
      <Tags>
        <TagsTrigger>
          {selected.map((t) => (
            <TagsValue key={t} onRemove={() => remove(t)}>
              {t}
            </TagsValue>
          ))}
        </TagsTrigger>
        <TagsContent>
          <TagsInput placeholder="Search tags..." />
          <TagsList>
            <TagsEmpty />
            <TagsGroup>
              {ALL_TAGS.map((t) => (
                <TagsItem
                  key={t}
                  value={t}
                  onSelect={() => toggle(t)}
                >
                  {t}
                  {selected.includes(t) && (
                    <span className="text-muted-foreground text-xs">Selected</span>
                  )}
                </TagsItem>
              ))}
            </TagsGroup>
          </TagsList>
        </TagsContent>
      </Tags>
    </div>
  );
}
