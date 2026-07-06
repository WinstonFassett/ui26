import React from "react";
import { Composition } from "remotion";
import {
  IntroducingUi26Demo,
  INTRODUCING_UI26_DURATION,
} from "@/demos/introducing-shadcn";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="introducing-ui26"
      component={IntroducingUi26Demo}
      durationInFrames={INTRODUCING_UI26_DURATION}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{}}
    />
  );
};
