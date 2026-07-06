import React from "react";
import { Composition } from "remotion";
import {
  IntroducingShadcnDemo,
  INTRODUCING_SHADCN_DURATION,
} from "@/demos/introducing-shadcn";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="introducing-shadcn"
      component={IntroducingShadcnDemo}
      durationInFrames={INTRODUCING_SHADCN_DURATION}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{}}
    />
  );
};
