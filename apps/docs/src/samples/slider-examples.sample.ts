import type { Sample } from "./types"

const sample: Sample = {
  id: "slider-examples",
  kind: "atom",
  title: "Slider examples",
  description: "Range sliders at different values including a disabled state.",
  componentName: "SliderExamples",
  relatedComponent: "slider",
  group: "examples",
  spec: {
    root: "col",
    elements: {
      col: {
        type: "Stack",
        props: { direction: "col", className: "gap-3 w-full" },
        children: ["s1", "s2", "s3"],
      },
      s1: { type: "Slider", props: { min: 0, max: 100, value: 65 }, children: [] },
      s2: { type: "Slider", props: { min: 0, max: 100, value: 30 }, children: [] },
      s3: { type: "Slider", props: { min: 0, max: 100, value: 80, disabled: true }, children: [] },
    },
  },
}

export default sample
