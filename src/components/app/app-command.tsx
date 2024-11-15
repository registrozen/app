import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useState } from "react";
import { cn, useBodyOnKeyDown, useFocus } from "../../lib/utils";

export function AppCommandList({ modal }: { modal?: boolean }) {
  const [search, setSearch] = useState("");
  const { ref: searchRef, focused, focus, blur } = useFocus<HTMLInputElement>();

  useBodyOnKeyDown((e: KeyboardEvent) => {
    if (e.code === "Escape" && !modal) {
      setSearch("");
      blur();
    } else if (e.code === "Tab" && !focused) {
      focus();
      e.stopPropagation();
      e.preventDefault();
    } else if (
      (/Key[A-Z]/.test(e.code) || /Digit[0-9]/.test(e.code)) &&
      !focused
    ) {
      focus();
    }
  });

  return (
    <>
      <CommandInput
        placeholder="Scrivi un comando o ricerca..."
        ref={searchRef}
        value={search}
        onValueChange={setSearch}
      />
      <CommandList
        className={cn([search === "" && !focused && !modal && "hidden"])}
      >
        <CommandEmpty>Nessun risultato trovato.</CommandEmpty>
        <CommandGroup heading="Messaggi">
          <CommandItem>Apri Messaggi</CommandItem>
          <CommandItem>Nuovo Messaggio</CommandItem>
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Bacheca">
          <CommandItem>Apri Bacheca</CommandItem>
          <CommandItem>Rispondi ad Avviso</CommandItem>
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Studenti">
          <CommandItem>Gestisci Presenza</CommandItem>
          <CommandItem>Gestisci Voti</CommandItem>
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Lezioni">
          <CommandItem>Aggiungi Firma</CommandItem>
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Classi">
          <CommandItem>Apri Classi</CommandItem>
        </CommandGroup>

        <CommandGroup heading="Impostazioni">
          <CommandItem>Apri Impostazioni</CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </>
  );
}

export function AppCommand() {
  return (
    <Command className="max-w-[40rem] rounded-lg border shadow-md md:min-w-[300px]">
      <AppCommandList />
    </Command>
  );
}

export function AppCommandDialog() {
  const [opened, setOpened] = useState(false);

  useBodyOnKeyDown((e) => {
    if (e.ctrlKey && e.code === "KeyK" && !opened) {
      setOpened(true);
      e.preventDefault();
      e.stopPropagation();
    }
  });

  return (
    <CommandDialog open={opened} onOpenChange={(value) => setOpened(value)}>
      <AppCommandList modal={true} />
    </CommandDialog>
  );
}
