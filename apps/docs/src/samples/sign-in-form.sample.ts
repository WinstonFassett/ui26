import type { Sample } from "./types"

const sample: Sample = {
  id: "sign-in-form",
  kind: "block",
  title: "Sign-in form",
  description: "Email + password form composed from Field primitives, with helper text and a submit row.",
  componentName: "SignInForm",
  category: "Forms",
  order: 1,
  featured: true,
  registryDependencies: ["card", "field", "input", "button"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: { className: "max-w-sm" }, children: ["hdr", "content", "footer"] },
      hdr: { type: "CardHeader", props: {}, children: ["title", "desc"] },
      title: { type: "CardTitle", props: { text: "Sign in" }, children: [] },
      desc: { type: "CardDescription", props: { text: "Use your work email to continue." }, children: [] },
      content: { type: "CardContent", props: {}, children: ["group"] },
      group: { type: "FieldGroup", props: {}, children: ["f-email", "f-pw"] },
      "f-email": { type: "Field", props: {}, children: ["lbl-email", "in-email", "desc-email"] },
      "lbl-email": { type: "FieldLabel", props: { text: "Email", htmlFor: "email" }, children: [] },
      "in-email": { type: "Input", props: { type: "email", placeholder: "you@company.com" }, children: [] },
      "desc-email": { type: "FieldDescription", props: { text: "We'll never share your email." }, children: [] },
      "f-pw": { type: "Field", props: {}, children: ["lbl-pw", "in-pw"] },
      "lbl-pw": { type: "FieldLabel", props: { text: "Password", htmlFor: "password" }, children: [] },
      "in-pw": { type: "Input", props: { type: "password", placeholder: "••••••••" }, children: [] },
      footer: { type: "CardFooter", props: {}, children: ["btn"] },
      btn: { type: "Button", props: { label: "Continue", className: "w-full" }, children: [] },
    },
  },
}

export default sample
