import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/auth";
import { useLocation, useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export function SignInPage() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation<
    void,
    Error,
    z.infer<typeof formSchema>
  >({
    async mutationFn({ username, password }) {
      await login(username, password);
    },
    onError() {
      form.setError("username", {
        type: "auth-error",
        message: "Credenziali errate",
      });
      form.setError("password", {
        type: "auth-error",
        message: "Credenziali errate",
      });
    },
    onSuccess() {
      if (location?.state?.location) navigate(location.state.location);
      else navigate("/");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <section className="mt-8 flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[300px] space-y-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Utente</FormLabel>
                <FormControl>
                  <Input placeholder="Nome utente" {...field} />
                </FormControl>
                <FormDescription>Nome utente / email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormDescription>Password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" className="w-[8rem]">
              Entra {isPending && <Spinner className="text-white" />}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
