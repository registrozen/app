import { AppCommand } from "@/components/app/app-command";
import { ActivityTipCard } from "@/components/ui/activity-tip-card";

export default function IndexPage() {
  return (
    <section className="relative flex flex-col items-center pt-[10rem]">
      <div className="absolute flex w-full justify-center">
        <AppCommand />
      </div>
      <section className="mt-20 flex w-3/4 flex-wrap justify-center">
        {new Array(5).fill(0).map((_, i) => (
          <ActivityTipCard
            key={i}
            title="prova"
            description="Attività di esempio bla bla"
            className="m-2"
          />
        ))}
      </section>
    </section>
  );
}
