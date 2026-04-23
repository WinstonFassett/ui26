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
import { Input } from "@registry/input/input.tsx";
import { Label } from "@registry/label/label.tsx";
import { Separator } from "@registry/separator/separator.tsx";
import { Switch } from "@registry/switch/switch.tsx";
import { Textarea } from "@registry/textarea/textarea.tsx";
import { cn } from "@registry/lib/utils";

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
  Input,
  Label,
  Separator,
  Switch,
  Textarea,
  cn,
};

export const reactNamespace = {
  ...React,
  default: React,
};

export const moduleScope: Record<string, unknown> = {
  "@tvui/react": tvuiNamespace,
  react: reactNamespace,
};
