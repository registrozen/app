import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export function createFilesystemRouter() {
  const modules = import.meta.glob("./routes/**/(page|layout|error).tsx", {
    eager: true,
    import: "default",
  });

  const paths = Object.keys(modules)
    .sort((a, b) => a.length - b.length)
    .reduce(
      (acc, key) => {
        const k = key.replace("./routes", "").replace(".tsx", "");
        const idx = k.lastIndexOf("/");
        const path = k.slice(0, idx + 1);
        const type = k.slice(idx + 1);

        if (!acc[path]) acc[path] = { page: () => <></> };
        (acc[path] as any)[type] = modules[key];
        return acc;
      },
      {} as Record<
        string,
        { page: React.FC; layout?: React.FC; error?: React.FC }
      >,
    );

  const routes: RouteObject[] = [];
  const segments: { path: string; route: RouteObject }[] = [];
  const errors: { path: string; Error: React.FC }[] = [];
  for (let [path, pages] of Object.entries(paths)) {
    const { page: Page, layout: Layout, error: Error } = pages;
    let pathSegment: string;
    do {
      pathSegment = path.replace(new RegExp(`^${segments[0]?.path ?? ""}`), "");
    } while (pathSegment === path && segments.shift());

    pathSegment = pathSegment.replace(/\[([^\[\]]+)\]/g, ":$1");

    while (errors.length > 0 && !path.startsWith(errors[0].path))
      errors.shift();
    if (Error) errors.unshift({ path, Error });

    const ErrorCmp = errors[0]?.Error;
    if (Layout) {
      let route: RouteObject = {
        path: pathSegment,
        element: <Layout />,
        errorElement: ErrorCmp ? <ErrorCmp /> : undefined,
        children: [{ index: true, element: <Page /> }],
      };

      if (segments[0]) segments[0].route.children?.push(route);
      else routes.push(route);

      if (!route.errorElement)
        route.errorElement = segments[0]?.route?.errorElement;

      segments.unshift({ path: path.endsWith("/") ? path : `${path}/`, route });
    } else {
      let route: RouteObject = {
        path: pathSegment,
        element: <Page />,
        errorElement: ErrorCmp ? <ErrorCmp /> : undefined,
      };
      if (segments[0]) segments[0].route.children?.push(route);
      else routes.push(route);

      if (!route.errorElement)
        route.errorElement = segments[0]?.route?.errorElement;
    }
  }

  return createBrowserRouter(routes);
}
