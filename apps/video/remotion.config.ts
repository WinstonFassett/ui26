// See all configuration options: https://remotion.dev/docs/config

import path from "path";
import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.setVideoImageFormat("jpeg");

Config.overrideWebpackConfig((config) => {
  const withTailwind = enableTailwind(config);
  return {
    ...withTailwind,
    resolve: {
      ...withTailwind.resolve,
      alias: {
        ...(withTailwind.resolve?.alias ?? {}),
        "@": path.join(process.cwd(), "src"),
      },
    },
  };
});
