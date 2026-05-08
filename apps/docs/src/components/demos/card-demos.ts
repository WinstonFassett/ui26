import type { Spec } from "@/lib/spec-to-code";

export interface CardDemo {
  id: string;
  label: string;
  spec: Spec;
}

export const CARD_BASIC: CardDemo = {
  id: "basic",
  label: "Basic card",
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["hdr", "content"] },
      hdr: { type: "CardHeader", props: {}, children: ["title", "desc"] },
      title: { type: "CardTitle", props: { text: "Card title" }, children: [] },
      desc: {
        type: "CardDescription",
        props: { text: "A short description that sits under the title." },
        children: [],
      },
      content: { type: "CardContent", props: {}, children: ["body"] },
      body: {
        type: "Text",
        props: { content: "Body content sits here.", size: "sm" },
        children: [],
      },
    },
  },
};

export const CARD_WITH_FOOTER: CardDemo = {
  id: "with-footer",
  label: "With footer",
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["hdr", "content", "footer"] },
      hdr: { type: "CardHeader", props: {}, children: ["title", "desc"] },
      title: { type: "CardTitle", props: { text: "Upgrade your plan" }, children: [] },
      desc: {
        type: "CardDescription",
        props: { text: "Unlock more projects and seats." },
        children: [],
      },
      content: { type: "CardContent", props: {}, children: ["body"] },
      body: {
        type: "Text",
        props: { content: "$19/month, cancel anytime.", size: "sm", muted: true },
        children: [],
      },
      footer: { type: "CardFooter", props: {}, children: ["btn"] },
      btn: { type: "Button", props: { label: "Upgrade" }, children: [] },
    },
  },
};

export const CARD_DEMOS: CardDemo[] = [CARD_BASIC, CARD_WITH_FOOTER];
