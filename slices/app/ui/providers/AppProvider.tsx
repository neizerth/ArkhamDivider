import type { PropsWithChildren } from "react";
import { StoreProvider } from "./StoreProvider";
import { I18NProvider } from "@/modules/core/i18n/app/ui/I18NProvider";
import { RouterProvider } from "@/modules/core/router/app/ui";
import { MUIProvider } from "./MUIProvider";


export function AppProvider({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <I18NProvider>
        <MUIProvider>
          <RouterProvider/>
        </MUIProvider>
      </I18NProvider>
    </StoreProvider>
  );
}