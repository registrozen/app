import { useClassesStore } from "@/stores/classes";
import { ClassCard } from "./class-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ClassesPage() {
  const { classes, otherClasses } = useClassesStore();
  return (
    <>
      <Accordion type="single" collapsible defaultValue="mine">
        <AccordionItem value="mine">
          <AccordionTrigger>Mie Classi</AccordionTrigger>
          <AccordionContent className="flex max-h-[70vh] snap-y flex-wrap overflow-y-auto p-2">
            {classes.map((p) => (
              <ClassCard
                key={p.id}
                model={p}
                className="m-2 min-w-[300px] snap-start"
              />
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="others">
          <AccordionTrigger>Altre Classi</AccordionTrigger>
          <AccordionContent className="flex max-h-[70vh] snap-y flex-wrap overflow-y-auto p-2">
            {otherClasses.map((p) => (
              <ClassCard
                key={p.id}
                model={p}
                className="m-1 min-w-[300px] snap-start"
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
