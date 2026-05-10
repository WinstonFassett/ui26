import * as React from "react";

import { Badge } from "@registry/badge/badge.tsx";
import { Button } from "@registry/button/button.tsx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@registry/card/card.tsx";
import { Checkbox } from "@registry/checkbox/checkbox.tsx";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldTitle,
  FieldSeparator,
} from "@registry/field/field.tsx";
import { Grid } from "@registry/grid/grid.tsx";
import { Heading } from "@registry/heading/heading.tsx";
import { Input } from "@registry/input/input.tsx";
import { Label } from "@registry/label/label.tsx";
import { Separator } from "@registry/separator/separator.tsx";
import { Stack } from "@registry/stack/stack.tsx";
import { Switch } from "@registry/switch/switch.tsx";
import { Textarea } from "@registry/textarea/textarea.tsx";
import { cn } from "@registry/lib/utils";

// One namespace exposing every ui26 export. Used as the `@tvui/react` alias
// AND as the source of per-component aliases below.
export const tvuiNamespace = {
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Checkbox,
  Field,
  FieldContent,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldTitle,
  FieldSeparator,
  Grid,
  Heading,
  Input,
  Label,
  Separator,
  Stack,
  Switch,
  Textarea,
  cn,
};

export const reactNamespace = {
  ...React,
  default: React,
};

// Per-component module aliases — match the consumer-canonical paths that
// `specToCode` emits (`import { Grid } from "@/components/ui/grid"` etc.).
// Compound families (card, field) export multiple symbols from one path.
const uiModules: Record<string, Record<string, unknown>> = {
  "@/components/ui/badge":     { Badge },
  "@/components/ui/button":    { Button },
  "@/components/ui/card":      { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter },
  "@/components/ui/checkbox":  { Checkbox },
  "@/components/ui/field":     { Field, FieldContent, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldSet, FieldLegend, FieldTitle, FieldSeparator },
  "@/components/ui/grid":      { Grid },
  "@/components/ui/heading":   { Heading },
  "@/components/ui/input":     { Input },
  "@/components/ui/label":     { Label },
  "@/components/ui/separator": { Separator },
  "@/components/ui/stack":     { Stack },
  "@/components/ui/switch":    { Switch },
  "@/components/ui/textarea":  { Textarea },
  "@/lib/utils":               { cn },
};

export const moduleScope: Record<string, unknown> = {
  "@tvui/react": tvuiNamespace,
  react: reactNamespace,
  ...uiModules,
};
