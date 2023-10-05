import { buttonVariants } from "~/ui/button"
import { cn } from "~/utils/cn"
import { TextIcon } from "@radix-ui/react-icons"
import { LayerType } from "@layerhub-io/types"
import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"

const LeftBar = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const { currentTemplate } = useTemplateEditorContext()

  const items = currentTemplate.scene.layers
    .filter((layer) => layer.type === LayerType.STATIC_TEXT)
    .map((layer) => layer.name || "")

  return (
    <div className="bg-white px-4 py-8">
      <h4 className="text-sm font-medium mb-6">Camadas</h4>

      <div className={cn("flex lg:flex-col lg:space-x-0 space-y-3 cursor-pointer", className)} {...props}>
        {items.map((item) => (
          <div
            key={item}
            className={cn(buttonVariants({ variant: "ghost" }), "justify-start hover:bg-muted hover:scale-[1.02]")}
          >
            <TextIcon className="h-4 w-4 mr-2" />

            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeftBar
