import type { HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ui26-tabs": HTMLAttributes<HTMLElement> & { "data-default"?: number };
    }
  }
}
