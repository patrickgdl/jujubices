import { Block } from "baseui/block"
import { Button, KIND } from "baseui/button"
import React from "react"
import { Link } from "react-router-dom"

type NavbarActionsProps = {
  onDownload: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  onLogout: () => void
  loading: boolean
  editing: boolean
  loggedIn: boolean
}

const NavbarActions = ({
  onDownload,
  onFileChange,
  onSubmit,
  onLogout,
  loading,
  editing,
  loggedIn,
}: NavbarActionsProps) => {
  const inputFileRef = React.useRef<HTMLInputElement>(null)

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  return (
    <Block $style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
      <input
        multiple={false}
        onChange={onFileChange}
        type="file"
        id="file"
        ref={inputFileRef}
        style={{ display: "none" }}
      />

      <Button
        size="compact"
        onClick={handleInputFileRefClick}
        kind={KIND.tertiary}
        overrides={{
          StartEnhancer: {
            style: {
              marginRight: "4px",
            },
          },
        }}
      >
        Importar
      </Button>

      <Button
        size="compact"
        onClick={onDownload}
        kind={KIND.tertiary}
        overrides={{
          StartEnhancer: {
            style: {
              marginRight: "4px",
            },
          },
        }}
      >
        Exportar
      </Button>

      {editing ? (
        <Button
          size="compact"
          onClick={onSubmit}
          kind={KIND.tertiary}
          isLoading={loading}
          overrides={{
            StartEnhancer: {
              style: {
                marginRight: "4px",
              },
            },
          }}
        >
          Atualizar
        </Button>
      ) : (
        <Button
          size="compact"
          onClick={onSubmit}
          kind={KIND.tertiary}
          isLoading={loading}
          overrides={{
            StartEnhancer: {
              style: {
                marginRight: "4px",
              },
            },
          }}
        >
          Salvar
        </Button>
      )}

      {loggedIn ? (
        <Button
          size="compact"
          onClick={onLogout}
          kind={KIND.tertiary}
          isLoading={loading}
          overrides={{
            StartEnhancer: {
              style: {
                marginRight: "4px",
              },
            },
          }}
        >
          Sair
        </Button>
      ) : (
        <Link to="/login">
          <Button
            size="compact"
            kind={KIND.tertiary}
            isLoading={loading}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            Login
          </Button>
        </Link>
      )}
    </Block>
  )
}

export default NavbarActions
