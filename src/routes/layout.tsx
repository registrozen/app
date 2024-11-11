import { LoginButton } from "@/components/ui/login-button";
import { Link, Outlet } from "react-router-dom";

export function LayoutPage() {
  return (
    <>
      <nav className="flex h-[4rem] items-center p-4 backdrop-blur-sm">
        <h1>
          <Link to={"/"}>
            Registro
            <span className="rounded bg-slate-900 p-1 text-secondary">Zen</span>
          </Link>
        </h1>
        <section className="flex grow justify-end">
          <LoginButton />
        </section>
      </nav>
      <main className="flex flex-col px-8 pt-8">
        <Outlet />
      </main>
    </>
  );
}
