export interface Snippet {
  name: string;
  group: string;
  code: string;
}

const BUTTON = `import { Button } from "@tvui/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-3 p-6">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
`;

const BADGE = `import { Badge } from "@tvui/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-3 p-6">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}
`;

const CARD = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@tvui/react";

export default function App() {
  return (
    <div className="p-6">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Invite a teammate</CardTitle>
          <CardDescription>
            They'll get an email with a link to join your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Paid plans include unlimited seats.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Invite</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
`;

const CHECKBOX = `import { Checkbox, Label } from "@tvui/react";
import { useState } from "react";

export default function App() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-2 p-6">
      <Checkbox
        id="terms"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
`;

const INPUT = `import { Input, Label } from "@tvui/react";

export default function App() {
  return (
    <div className="flex flex-col gap-2 p-6 w-80">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  );
}
`;

const LABEL = `import { Label, Input } from "@tvui/react";

export default function App() {
  return (
    <div className="flex flex-col gap-4 p-6 w-80">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Ada Lovelace" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="handle">Handle</Label>
        <Input id="handle" placeholder="@ada" />
      </div>
    </div>
  );
}
`;

const SEPARATOR = `import { Separator } from "@tvui/react";

export default function App() {
  return (
    <div className="p-6 w-80">
      <h3 className="text-sm font-medium">Radix Primitives</h3>
      <p className="text-sm text-muted-foreground">An open-source UI toolkit.</p>
      <Separator className="my-4" />
      <div className="flex gap-4 text-sm">
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  );
}
`;

const SWITCH = `import { Switch, Label } from "@tvui/react";
import { useState } from "react";

export default function App() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center gap-3 p-6">
      <Switch
        id="notifications"
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
      />
      <Label htmlFor="notifications">Email notifications</Label>
    </div>
  );
}
`;

const TEXTAREA = `import { Textarea, Label } from "@tvui/react";

export default function App() {
  return (
    <div className="flex flex-col gap-2 p-6 w-96">
      <Label htmlFor="msg">Message</Label>
      <Textarea id="msg" rows={4} placeholder="Write something thoughtful..." />
    </div>
  );
}
`;

export const snippets: Snippet[] = [
  { name: "Button", group: "Primitives", code: BUTTON },
  { name: "Badge", group: "Primitives", code: BADGE },
  { name: "Card", group: "Primitives", code: CARD },
  { name: "Checkbox", group: "Primitives", code: CHECKBOX },
  { name: "Input", group: "Primitives", code: INPUT },
  { name: "Label", group: "Primitives", code: LABEL },
  { name: "Separator", group: "Primitives", code: SEPARATOR },
  { name: "Switch", group: "Primitives", code: SWITCH },
  { name: "Textarea", group: "Primitives", code: TEXTAREA },
];

export const defaultSnippet = BUTTON;
