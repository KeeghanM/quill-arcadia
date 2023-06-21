import type { ArcType } from "./types"

import { createSignal, createContext, useContext } from "solid-js"
import { Arcs } from "./dummyValues"
import "./Story.css"
import ArcCard from "./ArcCard"
import Arc from "./Arc"

type storyProps = {
  id: string
  reset: () => void
}

export const ArcContext = createContext<ArcType>(undefined)

export default function Story(props: storyProps) {
  const userId = props.id
  const exit = props.reset

  const [screen, setScreen] = createSignal("arcs")
  const [arc, setArc] = createSignal<ArcType>()

  const sidebarItems = [
    { name: "Arcs", screenId: "arcs" },
    { name: "Collections", screenId: "collections" },
  ]

  const arcs: ArcType[] = Arcs

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  return (
    <>
      <ul class="sidebar">
        {sidebarItems.map((item) => (
          <li
            class="clickable"
            onclick={() => {
              setArc(undefined)
              setScreen(item.screenId)
            }}
          >
            {item.name}
          </li>
        ))}
        <li class="close">
          <button onclick={exit}>Close Story</button>
        </li>
      </ul>
      <main>
        {screen() == "arcs" && arc() ? (
          <>
            <ArcContext.Provider value={[arc, setArc]}>
              <div class="screenTitle">
                <h1>{toTitleCase(arc().name)}</h1>
                <button onclick={() => setArc(undefined)}>Close</button>
              </div>
              <Arc openArc={(arc: ArcType) => setArc(arc)} />
            </ArcContext.Provider>
          </>
        ) : (
          <>
            <div class="screenTitle">
              <h1>{toTitleCase(screen())}</h1>
              <button>Add New</button>
            </div>
            <div class="cardContainer">
              {screen() == "arcs" ? (
                <>
                  {arcs.map((arc) => (
                    <ArcCard
                      arc={arc}
                      openArc={(arc: ArcType) => setArc(arc)}
                    />
                  ))}
                </>
              ) : screen() == "collections" ? (
                <p>Collections</p>
              ) : (
                <p>Select a screen...</p>
              )}
            </div>
          </>
        )}
      </main>
    </>
  )
}
