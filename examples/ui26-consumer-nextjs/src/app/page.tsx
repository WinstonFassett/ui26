import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-svh flex items-center justify-center bg-background text-foreground">
      <Button data-testid="hello">Hello ui26</Button>
    </main>
  );
}
