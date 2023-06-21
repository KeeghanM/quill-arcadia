import type { Arc } from "./types"

import { createSignal } from "solid-js"
import { Arcs } from "./dummyValues.js"
import "./Story.css"
import ArcCard from "./ArcCard.jsx"

type storyProps = {
  id: string
  reset: () => void
}

export default function Story(props: storyProps) {
  const userId = props.id
  const exit = props.reset

  const [screen, setScreen] = createSignal("arcs")
  const [arc, setArc] = createSignal<Arc>()

  const sidebarItems = [
    { name: "Arcs", screenId: "arcs" },
    { name: "Collections", screenId: "collections" },
  ]

  const arcs: Arc[] = Arcs

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
            <div class="screenTitle">
              <h1>{toTitleCase(arc().name)}</h1>
              <button onclick={() => setArc(undefined)}>Close</button>
            </div>
            <div>{arc().name}</div>
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
                    <ArcCard arc={arc} openArc={(arc: Arc) => setArc(arc)} />
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
