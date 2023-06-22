import type { ArcType, CollectionType } from "./types"

import { createSignal, createContext, Show, For } from "solid-js"
import "./Story.css"
import Arc from "./Arcs/Arc"
import ArcsList from "./Arcs/ArcsList"
import { toTitleCase } from "./lib/helpers"

type storyProps = {
  id: string
  reset: () => void
}

export const ArcContext = createContext<ArcType>(undefined)
export const CollectionContext = createContext<CollectionType>(undefined)

export default function Story(props: storyProps) {
  const userId = props.id
  const exit = props.reset

  const [screen, setScreen] = createSignal("arcs")
  const [arc, setArc] = createSignal<ArcType>()
  const [collection, setCollection] = createSignal<CollectionType>()

  const changeScreen = (screen: string) => {
    setScreen(screen)
    setArc(undefined)
    setCollection(undefined)
  }

  const sidebarItems = [
    { name: "Arcs", screenId: "arcs" },
    { name: "Collections", screenId: "collections" },
  ]

  return (
    <>
      <ul class="sidebar">
        <For each={sidebarItems}>
          {(item) => (
            <li
              class="clickable"
              onclick={() => {
                changeScreen(item.screenId)
              }}
            >
              {item.name}
            </li>
          )}
        </For>
        <li class="close">
          <button onclick={exit}>Close Story</button>
        </li>
      </ul>
      <main>
        <Show when={screen() == "arcs"}>
          <Show
            when={arc()}
            fallback={<ArcsList openArc={(arc: ArcType) => setArc(arc)} />}
          >
            <ArcContext.Provider value={[arc, setArc]}>
              <div class="screenTitle">
                <h1>{toTitleCase(arc().name)}</h1>
                <button onclick={() => setArc(undefined)}>Close</button>
              </div>
              <Arc openArc={(arc: ArcType) => setArc(arc)} />
            </ArcContext.Provider>
          </Show>
        </Show>
        <Show when={screen() == "collections"}>
          <p>Collections</p>
        </Show>
      </main>
    </>
  )
}
