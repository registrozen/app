import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Class } from "@/types/model";
import { ArrowRight, CircleAlert, EllipsisVertical } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export function ClassCard({
  model,
  className,
}: {
  model: Class;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "group cursor-pointer select-none p-4 pb-1 transition-shadow delay-75 hover:shadow-md",
        className,
      )}
    >
      <NavLink to={`/classes/${model.id}`}>
        <CardTitle className="flex">
          <h1 className="leading-normal">{model.name}</h1>
          <ArrowRight className="ml-auto transition-all group-hover:translate-x-1" />
        </CardTitle>
        <CardContent className="flex flex-col p-0 text-sm">
          <section>
            <h2>Insegnamenti</h2>
            <div className="mb-4 mt-2 space-x-2">
              <span className="rounded-sm border p-1 hover:bg-slate-50">
                INFO
              </span>
              <span className="rounded-sm border p-1 hover:bg-slate-50">
                TPSI
              </span>
              <span className="rounded-sm border p-1 hover:bg-slate-50">
                SIS
              </span>
            </div>
          </section>
          <section className="text-sm">
            <Button variant={"link"} className="p-1">
              Firma
            </Button>
            &bull;
            <Button variant={"link"} className="p-1">
              Compresenza
            </Button>
          </section>
        </CardContent>
        <CardFooter className="p-0">
          <section className="flex justify-start pt-2 text-xs">
            <div className="flex w-8 flex-col">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-4 w-4 cursor-pointer rounded-full border bg-green-400 text-center"></div>
                  </TooltipTrigger>
                  <TooltipContent>Presenti</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div>10</div>
            </div>
            <div className="flex w-8 flex-col">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-4 w-4 cursor-pointer rounded-full border bg-red-400 text-center"></div>
                  </TooltipTrigger>
                  <TooltipContent>Assenti</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div>10</div>
            </div>
            <div className="flex w-8 flex-col">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-4 w-4 cursor-pointer rounded-full border bg-yellow-400 text-center"></div>
                  </TooltipTrigger>
                  <TooltipContent>Ritardatari</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div>10</div>
            </div>
            <div className="flex w-8 flex-col">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-4 w-4 cursor-pointer rounded-full border bg-gray-400 text-center"></div>
                  </TooltipTrigger>
                  <TooltipContent>Presenti fuori aula</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div>10</div>
            </div>
            <div className="flex w-8 flex-col">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-4 w-4 cursor-pointer rounded-full border bg-amber-400 text-center"></div>
                  </TooltipTrigger>
                  <TooltipContent>Usciti</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div>10</div>
            </div>
          </section>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                className="ml-auto h-8 w-8 rounded-full"
              >
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Azioni</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Firma</DropdownMenuItem>
              <DropdownMenuItem>Registra Voti</DropdownMenuItem>
              <DropdownMenuItem>Interroga</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Richiamo</DropdownMenuItem>
              <DropdownMenuItem>Nota Disciplinare</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <div className="flex-grow">
          <Button variant={"link"}>Firma</Button>
          <Button variant={"link"}>Registra Voti</Button>
          <Button variant={"link"}>Interroga</Button>
        </div> */}
        </CardFooter>
      </NavLink>
    </Card>
  );
}
