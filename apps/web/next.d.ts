import type {
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType,
  NextPage,
} from "next";
import type { AppProps } from "next/app";
import { Child } from "./types";

declare module "next" {
  type NextLayoutComponentType<P = {}> = NextComponentType<
    NextPageContext,
    any,
    P
  > & {
    Layout?: (page: ReactNode) => ReactNode;
    RequireAuth: boolean;
  };

  type NextPageWithLayout = NextPage & {
    Layout: (arg0: Child) => JSX.Element;
    RequireAuth: boolean;
  };
}

declare module "next/app" {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType;
  };
}
