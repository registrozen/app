import { AppCommand } from "@/components/app/app-command";
import { ActivityTipCard } from "@/components/ui/activity-tip-card";

export function IndexPage() {
  return (
    <section className="relative flex flex-col items-center pt-[10rem]">
      <div className="absolute flex w-full justify-center">
        <AppCommand />
      </div>
      <section className="mt-20 grid grid-cols-3 gap-4">
        {new Array(6).fill(0).map((_) => (
          <ActivityTipCard
            title="prova"
            description="Attività di esempio bla bla"
          />
        ))}
      </section>
    </section>
  );
}
