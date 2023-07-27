import Graphic from "./graphic"
import { Dialog, DialogContent, DialogTrigger } from "~/ui/dialog"

const Preview = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent>
        <Graphic />
      </DialogContent>
    </Dialog>
  )
}

export default Preview
