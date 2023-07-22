import React from "react"
import { useNavigate } from "react-router-dom"
import Images from "~/components/icons/Images"
import Template from "~/components/icons/Template"
import { Button } from "~/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/ui/card"
import { Label } from "~/ui/label"
import { RadioGroup, RadioGroupItem } from "~/ui/radio-group"

export default function SelectEditor() {
  const navigate = useNavigate()
  const [selectedEditor, setSelectedEditor] = React.useState("editor")

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Escolha</CardTitle>
          <CardDescription>Crie um novo template ou escolha de uma lista de pré-prontos.</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <RadioGroup
            defaultValue="editor"
            className="grid grid-cols-2 gap-4"
            onValueChange={(value) => setSelectedEditor(value)}
          >
            <Label
              htmlFor="editor"
              className="flex flex-col items-center justify-between gap-y-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="editor" id="editor" className="sr-only" />
              <Images size={30} />
              Criar do zero
            </Label>
            <Label
              htmlFor="template"
              className="flex flex-col items-center justify-between gap-y-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="template" id="template" className="sr-only" />
              <Template size={30} />
              Templates
            </Label>
          </RadioGroup>
        </CardContent>

        <CardFooter>
          <Button onClick={() => navigate(`/${selectedEditor}`)} className="w-full">
            Continuar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
