import { MoveRight } from "lucide-react";

export function ActivityTipCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="group h-24 w-60 cursor-pointer space-y-1 rounded-md border p-2 hover:bg-accent">
      <h1 className="font-semibold capitalize">{title}</h1>
      <p className="text-sm">{description}</p>
      <div>
        <MoveRight className="ml-auto mr-2 transition delay-100 group-hover:translate-x-1" />
      </div>
    </div>
  );
}
