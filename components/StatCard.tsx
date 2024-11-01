import { Card, CardContent } from "./ui/card";

export function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card className="shadow-none">
      <CardContent className="flex flex-col justify-center p-6 bg-background1 rounded-lg shadow-none border-2 border-border1">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
