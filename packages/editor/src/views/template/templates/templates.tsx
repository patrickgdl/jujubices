import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Button } from "~/ui/button"
import { ScrollArea, ScrollBar } from "~/ui/scroll-area"
import { Separator } from "~/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"

import { EmptyPlaceholder } from "./empty-placeholder"
import { Template } from "~/types/templates"
import useUserRole from "~/hooks/useUserRole"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "~/store/store"
import { useSelector } from "react-redux"
import { selectTemplates } from "~/store/slices/templates/selectors"
import React from "react"
import { getTemplates } from "~/store/slices/templates/actions"

const NEXT_ROUTE = {
  admin: "/editor",
  user: "/template",
} as { [key: string]: string }

export default function Templates() {
  const role = useUserRole()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { templates } = useSelector(selectTemplates)

  React.useEffect(() => {
    dispatch(getTemplates())
  }, [])

  return (
    <div className="bg-background">
      <div className="grid lg:grid-cols-4">
        <div className="col-span-3 lg:col-span-4 lg:border-l">
          <div className="h-full px-4 py-6 lg:px-8">
            <Tabs defaultValue="all" className="h-full space-y-6">
              <div className="space-between flex items-center">
                <TabsList>
                  <TabsTrigger value="all" className="relative">
                    Todos
                  </TabsTrigger>
                  <TabsTrigger value="birthday">Aniversário</TabsTrigger>
                  <TabsTrigger value="wedding" disabled>
                    Casamento
                  </TabsTrigger>
                </TabsList>
                <div className="ml-auto mr-4">
                  <Button>
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Solicite um template
                  </Button>
                </div>
              </div>
              <TabsContent value="all" className="border-none p-0 outline-none">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Templates</h2>
                    <p className="text-sm text-muted-foreground">
                      Principais escolhas para você. Atualizado semanalmente.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="relative">
                  <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                      {templates.map(({ uuid, template }, index) => {
                        const parsed = JSON.parse(template as string) as Template
                        const { preview } = parsed

                        return (
                          <div key={index} className="space-y-3 w-[250px]">
                            <div className="overflow-hidden rounded-md">
                              <img
                                src={preview.src}
                                alt={preview.id}
                                width={1080}
                                height={1920}
                                onClick={() => navigate(`${NEXT_ROUTE[role]}/${uuid}`)}
                                className={"h-auto w-auto object-cover transition-all hover:scale-105 aspect-[9/16]"}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="birthday" className="h-full flex-col border-none p-0 data-[state=active]:flex">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Aniversário</h2>
                    <p className="text-sm text-muted-foreground">A festa perfeita pra você desde o convite.</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <EmptyPlaceholder />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
