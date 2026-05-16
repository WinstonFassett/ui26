import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";

export interface TicketCardProps {
  id: string;
  title: string;
  description: string;
  priority: "P0" | "P1" | "P2" | "P3";
  tags: string[];
}

const priorityVariant = {
  P0: "destructive",
  P1: "outline",
  P2: "outline",
  P3: "secondary",
} as const;

export function TicketCard({ id: _id, title, description, priority, tags }: TicketCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack direction="row" gap="1" wrap>
          <Badge variant={priorityVariant[priority]}>{priority}</Badge>
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </Stack>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Open</Button>
      </CardFooter>
    </Card>
  );
}
