import { useEditor } from "@layerhub-io/react"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import { Delete } from "baseui/icon"
import { Input, SIZE } from "baseui/input"
import { groupBy } from "lodash"
import React from "react"
import { useSelector } from "react-redux"
import { useDebounce } from "use-debounce"
import Search from "~/components/Icons/Search"
import InfiniteScrolling from "~/components/InfiniteScrolling"
import Scrollable from "~/components/Scrollable"
import useAppContext from "~/hooks/useAppContext"
import { queryFonts } from "~/store/slices/fonts/actions"
import { selectFonts } from "~/store/slices/fonts/selectors"
import { useAppDispatch } from "~/store/store"
import { loadFonts } from "~/utils/fonts"

export default function () {
  const [css] = useStyletron()
  const editor = useEditor()
  const dispatch = useAppDispatch()

  const [query, setQuery] = React.useState("")
  const [hasMore, setHasMore] = React.useState(true)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [commonFonts, setCommonFonts] = React.useState<any[]>([])

  const fonts = useSelector(selectFonts)
  const { setActiveSubMenu } = useAppContext()
  const [searchQuery] = useDebounce(query, 250)

  React.useEffect(() => {
    const grouped = groupBy(fonts, "family")
    const standardFonts = Object.keys(grouped).map((key) => {
      const familyFonts = grouped[key]
      const standardFont = familyFonts.find((familyFont) => familyFont?.postScriptName?.includes("-Regular"))

      if (standardFont) {
        return standardFont
      }

      return familyFonts[familyFonts.length - 1]
    })
    setCommonFonts(standardFonts)
  }, [fonts])

  const handleFontFamilyChange = async (x: any) => {
    if (editor) {
      const font = {
        name: x.postScriptName,
        url: x.url,
      }
      await loadFonts([font])

      editor.objects.update({
        fontFamily: x.postScriptName,
        fontURL: font.url,
      })
    }
  }

  React.useEffect(() => {
    dispatch(
      queryFonts({
        query: searchQuery,
        skip: pageNumber,
        take: 100,
      })
    )
    setHasMore(false)

    if (!searchQuery) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }
  }, [searchQuery])

  const fetchData = React.useCallback(() => {
    if (!searchQuery) {
      dispatch(
        queryFonts({
          query: searchQuery,
          skip: pageNumber,
          take: 100,
        })
      )
    }

    setPageNumber(pageNumber + 1)
  }, [pageNumber, searchQuery])

  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <Block>Selecione uma fonte</Block>

        <Block onClick={() => setActiveSubMenu("")} $style={{ cursor: "pointer", display: "flex" }}>
          <Delete size={24} />
        </Block>
      </Block>

      <Block $style={{ padding: "0 1.5rem 1rem" }}>
        <Input
          overrides={{
            Root: {
              style: {
                paddingLeft: "8px",
              },
            },
          }}
          clearable
          onChange={(e) => setQuery((e.target as any).value)}
          placeholder="Pesquisar fonte"
          size={SIZE.compact}
          startEnhancer={<Search size={16} />}
        />
      </Block>

      <Scrollable>
        <Block $style={{ padding: "0 1.5rem", display: "grid", gap: "0.2rem" }}>
          <InfiniteScrolling fetchData={fetchData} hasMore={hasMore}>
            <Block $style={{ display: "grid" }}>
              {commonFonts.map((font, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleFontFamilyChange(font)}
                    className={css({
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "14px",
                      ":hover": {
                        backgroundColor: "rgb(245,246,247)",
                      },
                    })}
                    id={font.id}
                  >
                    <img src={font.preview} />
                    {/* <LazyLoadImage url={font.preview} /> */}
                  </div>
                )
              })}
            </Block>
          </InfiniteScrolling>
        </Block>
      </Scrollable>
    </Block>
  )
}
