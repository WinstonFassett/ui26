import { Button } from "@/components/ui/button";
import { Hardware } from "@/components/ui/hardware";
import { Tabs } from "@/components/ui/tabs";

function App() {
  return (
    <main className="min-h-svh flex flex-col gap-8 items-center justify-center bg-background text-foreground">
      <Button data-testid="hello">Hello ui26</Button>
      <Hardware keyColor={{ l: 0.7, c: 0.15, h: 250 }} className="w-96 p-4" data-testid="spec01">
        <Tabs
          items={[
            { value: "a", label: "Alpha", body: <p>Alpha panel (spec-01 Tabs via UI SDK)</p> },
            { value: "b", label: "Beta", body: <p>Beta panel</p> },
            { value: "c", label: "Gamma", body: <p>Gamma panel</p> },
          ]}
        />
      </Hardware>
    </main>
  );
}

export default App;
