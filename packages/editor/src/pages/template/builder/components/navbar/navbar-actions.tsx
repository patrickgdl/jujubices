import React from "react"
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
    <div className="flex items-center justify-end">
      <input
        multiple={false}
        onChange={onFileChange}
        type="file"
        id="file"
        ref={inputFileRef}
        style={{ display: "none" }}
      />

      <Button onClick={handleInputFileRefClick} variant="ghost">
        Importar
      </Button>

      <Button onClick={onExport} variant="ghost">
        Exportar
      </Button>

      {editing ? (
        <Button onClick={onSubmit} variant="ghost">
          Atualizar
        </Button>
      ) : (
        <Button onClick={onSubmit} variant="ghost">
          Salvar
        </Button>
      )}
    </div>
  )
}

export default NavbarActions
