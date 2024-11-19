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

  const routes = Object.entries(paths).reduce(
    (acc, [path, { page: Page, layout: Layout, error: Error }]) => {
      let curPath: string;
      let subPath: string;
      do {
        curPath = acc.stack[0]?.path ?? "";
        subPath = path.replace(new RegExp(`^${curPath}`), "");
      } while (subPath === path && acc.stack.shift());

      subPath = subPath.replace(/\[([^\[\]]+)\]/g, ":$1");

      if (Layout && Error) {
        const node: RouteObject = {
          errorElement: <Error />,
          children: [{ index: true, element: <Page /> }],
        };
        const route: RouteObject = {
          path: subPath,
          element: <Layout />,
          children: [node],
        };

        if (acc.stack[0]) acc.stack[0].node.children?.push(route);
        else acc.root.push(route);

        acc.stack.unshift({ path, node });
      } else if (Layout) {
        const route: RouteObject = {
          path: subPath,
          element: <Layout />,
          children: [{ index: true, element: <Page /> }],
        };

        if (acc.stack[0]) acc.stack[0].node.children?.push(route);
        else acc.root.push(route);

        acc.stack.unshift({ path, node: route });
      } else if (Error) {
        const route: RouteObject = {
          path: subPath,
          errorElement: <Error />,
          children: [{ index: true, element: <Page /> }],
        };

        if (acc.stack[0]) acc.stack[0].node.children?.push(route);
        else acc.root.push(route);

        acc.stack.unshift({ path, node: route });
      } else {
        const route: RouteObject = {
          path: subPath,
          element: <Page />,
          children: [{ index: true, element: <Page /> }],
        };

        if (acc.stack[0]) acc.stack[0].node.children?.push(route);
        else acc.root.push(route);
      }

      return acc;
    },
    {
      stack: [],
      root: [],
    } as {
      root: RouteObject[];
      stack: { path: string; node: RouteObject }[];
    },
  );

  return createBrowserRouter(routes.root);
}
