import { clsx, type ClassValue } from "clsx";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useFocus<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);
    ref.current?.addEventListener("focus", onFocus);
    ref.current?.addEventListener("blur", onBlur);

    return () => {
      ref.current?.removeEventListener("focus", onFocus);
      ref.current?.removeEventListener("blur", onBlur);
    };
  }, [ref]);

  return {
    ref,
    focused,
    focus() {
      ref.current?.focus();
    },
    blur() {
      ref.current?.blur();
    },
  };
}

export function useBodyOnKeyDown(
  fn: (e: KeyboardEvent) => Promise<void> | void,
) {
  useEffect(() => {
    document.body.addEventListener("keydown", fn);

    return () => document.body.removeEventListener("keydown", fn);
  }, [fn]);
}

export async function testWait(fail: boolean) {
  await new Promise<void>((r, e) =>
    setTimeout(() => {
      if (fail) e();
      else r();
    }, 2000),
  );
}
