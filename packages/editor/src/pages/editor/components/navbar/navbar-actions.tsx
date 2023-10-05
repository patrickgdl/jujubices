import React from "react"
import Preview from "~/components/preview/preview"
import { Button } from "~/ui/button"

type NavbarActionsProps = {
  onExport: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  loading: boolean
  editing: boolean
}

const NavbarActions = ({ onExport, onFileChange, onSubmit, loading, editing }: NavbarActionsProps) => {
  const inputFileRef = React.useRef<HTMLInputElement>(null)

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  return (
    <div className="flex items-center justify-end space-x-2">
      <input
        multiple={false}
        onChange={onFileChange}
        type="file"
        id="file"
        ref={inputFileRef}
        style={{ display: "none" }}
      />

      <Preview>
        <Button variant="outline">Preview</Button>
      </Preview>

      <Button onClick={handleInputFileRefClick} variant="outline">
        Importar
      </Button>

      <Button onClick={onExport} variant="outline">
        Exportar
      </Button>

      {editing ? (
        <Button onClick={onSubmit} variant="default">
          Atualizar
        </Button>
      ) : (
        <Button onClick={onSubmit} variant="default">
          Salvar
        </Button>
      )}
    </div>
  )
}

export default NavbarActions
