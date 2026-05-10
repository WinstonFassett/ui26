"use client";

import { Alert, AlertTitle } from "@registry/alert/alert";
import { Badge } from "@registry/badge/badge";
import { Button } from "@registry/button/button";
import { Checkbox } from "@registry/checkbox/checkbox";
import { Input } from "@registry/input/input";
import { Field, FieldLabel } from "@registry/field/field";
import { Label } from "@registry/label/label";
import { Switch } from "@registry/switch/switch";
import { Textarea } from "@registry/textarea/textarea";

type Demo = { id: string; label: string };
type TileRenderer = (demo: Demo) => React.ReactNode;

const ALERT_TITLES: Record<string, string> = {
  default: "Heads up",
  destructive: "Error",
  warning: "Warning",
  success: "Success",
};

export const TILE_REGISTRY: Record<string, Record<string, TileRenderer>> = {
  alert: {
    variants: () => (
      <div className="flex flex-col gap-2 w-full max-w-xs pointer-events-none">
        {(["default", "destructive", "warning", "success"] as const).map((v) => (
          <Alert key={v} variant={v === "default" ? undefined : v} className="py-2 text-left">
            <AlertTitle className="text-xs">{ALERT_TITLES[v]}</AlertTitle>
          </Alert>
        ))}
      </div>
    ),
  },
  badge: {
    variants: () => (
      <div className="flex flex-wrap items-center gap-1">
        {(["default", "secondary", "outline", "ghost", "destructive"] as const).map((v) => (
          <Badge key={v} variant={v}>Badge</Badge>
        ))}
      </div>
    ),
  },
  button: {
    variants: () => (
      <div className="flex flex-wrap items-center gap-1">
        {(["default", "secondary", "outline", "ghost", "destructive"] as const).map((v) => (
          <Button key={v} variant={v} size="sm" tabIndex={-1} className="pointer-events-none">Aa</Button>
        ))}
      </div>
    ),
    sizes: () => (
      <div className="flex items-center gap-1">
        {(["sm", "default", "lg"] as const).map((s) => (
          <Button key={s} size={s} tabIndex={-1} className="pointer-events-none">Aa</Button>
        ))}
        <Button size="icon" tabIndex={-1} className="pointer-events-none">⚡</Button>
      </div>
    ),
  },
  checkbox: {
    states: (demo) => {
      const map: Record<string, React.ReactNode> = {
        default: <Checkbox tabIndex={-1} />,
        checked: <Checkbox defaultChecked tabIndex={-1} />,
        disabled: <Checkbox disabled tabIndex={-1} />,
        "disabled-checked": <Checkbox disabled defaultChecked tabIndex={-1} />,
      };
      return map[demo.id] ?? <Checkbox tabIndex={-1} />;
    },
  },
  input: {
    states: () => (
      <div className="flex flex-col gap-1">
        <Input placeholder="Type here" className="w-40" tabIndex={-1} />
        <Input defaultValue="not-an-email" aria-invalid className="w-40" tabIndex={-1} />
        <Input placeholder="Disabled" disabled className="w-40" tabIndex={-1} />
      </div>
    ),
    types: () => (
      <div className="flex flex-col gap-1">
        <Input type="text" placeholder="Text" className="w-40" tabIndex={-1} />
        <Input type="email" placeholder="you@company.com" className="w-40" tabIndex={-1} />
        <Input type="password" placeholder="Password" className="w-40" tabIndex={-1} />
        <Input type="search" placeholder="Search…" className="w-40" tabIndex={-1} />
      </div>
    ),
  },
  label: {
    compositions: (demo) => {
      if (demo.id === "default") return <Label>Email</Label>;
      if (demo.id === "with-input") {
        return (
          <Field className="pointer-events-none w-44">
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="you@example.com" tabIndex={-1} />
          </Field>
        );
      }
      return (
        <Field className="pointer-events-none w-44">
          <FieldLabel>Email</FieldLabel>
          <Input placeholder="Disabled" disabled tabIndex={-1} />
        </Field>
      );
    },
  },
  switch: {
    states: (demo) => {
      const map: Record<string, React.ReactNode> = {
        default: <Switch tabIndex={-1} />,
        checked: <Switch defaultChecked tabIndex={-1} />,
        disabled: <Switch disabled tabIndex={-1} />,
        "disabled-checked": <Switch disabled defaultChecked tabIndex={-1} />,
      };
      return map[demo.id] ?? <Switch tabIndex={-1} />;
    },
    composition: () => (
      <Field orientation="horizontal" className="pointer-events-none">
        <Switch tabIndex={-1} />
        <FieldLabel>Notifications</FieldLabel>
      </Field>
    ),
  },
  textarea: {
    states: (demo) => {
      const map: Record<string, React.ReactNode> = {
        default: <Textarea placeholder="Type here" rows={3} className="w-56" tabIndex={-1} />,
        invalid: <Textarea defaultValue="too short" aria-invalid rows={3} className="w-56" tabIndex={-1} />,
        disabled: <Textarea placeholder="Disabled" disabled rows={3} className="w-56" tabIndex={-1} />,
      };
      return map[demo.id] ?? <Textarea placeholder="Type here" rows={3} className="w-56" tabIndex={-1} />;
    },
  },
};
