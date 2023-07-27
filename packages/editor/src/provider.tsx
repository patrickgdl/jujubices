import "./translations"

import { Provider as ScenifyProvider } from "@layerhub-io/react"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import i18next from "i18next"
import React from "react"
import { I18nextProvider } from "react-i18next"
import { Provider as ReduxProvider } from "react-redux"

import { AppProvider } from "./contexts/AppContext"
import { TemplateEditorProvider } from "./contexts/TemplateEditor"
import { UserContextProvider } from "./hooks/useUser"
import supabase from "./services/supabase"
import { store } from "./store/store"
import { TooltipProvider } from "./ui/tooltip"

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <UserContextProvider>
        <ReduxProvider store={store}>
          <TemplateEditorProvider>
            <AppProvider>
              <ScenifyProvider>
                <TooltipProvider>
                  <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
                </TooltipProvider>
              </ScenifyProvider>
            </AppProvider>
          </TemplateEditorProvider>
        </ReduxProvider>
      </UserContextProvider>
    </SessionContextProvider>
  )
}

export default Provider
