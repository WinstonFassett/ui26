import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TabsProgressive, TabsProgressiveItem } from "@/components/ui/tabs-progressive";

export default function Home() {
  return (
    <main className="min-h-svh p-8 bg-background text-foreground space-y-10">
      <h1 className="text-2xl font-semibold">ui26 — Next.js App Router</h1>

      {/* RSC-safe presentationals — no "use client" */}
      <section className="space-y-2">
        <h2 className="text-sm font-mono uppercase tracking-wide text-muted-foreground">Presentationals (RSC)</h2>
        <div className="flex gap-2 items-center flex-wrap">
          <Button data-testid="button-primary">Primary</Button>
          <Button variant="outline" data-testid="button-outline">Outline</Button>
          <Badge>Badge</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      {/* Tabs — state-driven, "use client", requires hydration */}
      <section className="space-y-2">
        <h2 className="text-sm font-mono uppercase tracking-wide text-muted-foreground">Tabs — state-driven (requires JS)</h2>
        <Tabs defaultValue="account" data-testid="tabs-stateful">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card><CardHeader><CardTitle>Account</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Manage your account.</p></CardContent></Card>
          </TabsContent>
          <TabsContent value="password">
            <Card><CardHeader><CardTitle>Password</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Update your password.</p></CardContent></Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card><CardHeader><CardTitle>Settings</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Configure settings.</p></CardContent></Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* TabsProgressive — RSC, no-JS functional */}
      <section className="space-y-2">
        <h2 className="text-sm font-mono uppercase tracking-wide text-muted-foreground">TabsProgressive — radio shell (no JS required)</h2>
        <TabsProgressive defaultIndex={0} data-testid="tabs-progressive">
          <TabsProgressiveItem label="Preview">
            <Card><CardHeader><CardTitle>Preview</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">This panel works without JavaScript.</p></CardContent></Card>
          </TabsProgressiveItem>
          <TabsProgressiveItem label="Code">
            <Card><CardHeader><CardTitle>Code</CardTitle></CardHeader><CardContent><pre className="text-xs text-muted-foreground">{"<TabsProgressive />"}</pre></CardContent></Card>
          </TabsProgressiveItem>
          <TabsProgressiveItem label="Props">
            <Card><CardHeader><CardTitle>Props</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">defaultIndex, variant, listClass.</p></CardContent></Card>
          </TabsProgressiveItem>
        </TabsProgressive>
      </section>

      {/*
        NOTE: dialog, dropdown-menu, popover, tooltip, accordion, checkbox,
        radio-group, switch, slider, toggle, pagination are not yet ported to
        the RSC shell+upgrade pattern and will error under Next App Router.
        Each gets its own follow-up worktree.
      */}
    </main>
  );
}
