import { cn } from "@/lib/utils";

export const SHIKI_CLASSES = cn(
  "flex-1 overflow-auto bg-muted/40 px-4 py-3.5",
  "[&_.shiki]:bg-transparent! [&_pre]:m-0! [&_pre]:p-0! [&_code]:text-[12px]! [&_code]:leading-[1.6]! [&_code]:font-mono",
  "dark:[&_.shiki]:text-[var(--shiki-dark)]!",
  "dark:[&_.shiki_span]:text-[var(--shiki-dark)]!",
  "dark:[&_.shiki_span]:[font-style:var(--shiki-dark-font-style)]!",
  "dark:[&_.shiki_span]:[font-weight:var(--shiki-dark-font-weight)]!",
  "dark:[&_.shiki_span]:[text-decoration:var(--shiki-dark-text-decoration)]!"
);
