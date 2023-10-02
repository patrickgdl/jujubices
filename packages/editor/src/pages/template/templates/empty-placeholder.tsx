import Template from "~/components/icons/Template"
import { Button } from "~/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog"
import { Input } from "~/ui/input"
import { Label } from "~/ui/label"

export function EmptyPlaceholder() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <Template size={40} />

        <h3 className="mt-4 text-lg font-semibold">Sem templates por aqui</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          Não temos templates nessa categoria. Sugira um ou compre um personalizado conosco.
        </p>
        <Dialog>
          <DialogTrigger>
            <Button size="sm" className="relative">
              Solicitar template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Solicitar Template</DialogTitle>
              <DialogDescription>
                Forneça o maior número de informações para seu convite, como imagens exemplo, cores e tema (ex:
                Aniversário infantial do Mickey)
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="url">URL de uma imagem exemplo</Label>
                <Input id="url" placeholder="https://example.com/mickey.png" />
              </div>
            </div>
            <DialogFooter>
              <Button>Solicitar template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
