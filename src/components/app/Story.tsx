import type { ArcType, CollectionType, ThingType } from "./lib/types"

import { createSignal, createContext, Show, For } from "solid-js"
import Arc from "./Arcs/Arc"
import ArcsList from "./Arcs/ArcsList"
import Collection from "./Collections/Collection"
import CollectionsList from "./Collections/CollectionsList"
import Thing from "./Things/Thing"

import { toTitleCase } from "./lib/helpers"

type storyProps = {
  id: string
  reset: () => void
}

export const ArcContext = createContext<ArcType>(undefined)
export const CollectionContext = createContext<CollectionType>(undefined)
export const ThingContext = createContext<ThingType>(undefined)

export default function Story(props: storyProps) {
  const userId = props.id
  const exit = props.reset

  const [screen, setScreen] = createSignal("arcs")
  const [arc, setArc] = createSignal<ArcType>()
  const [collection, setCollection] = createSignal<CollectionType>()
  const [thing, setThing] = createSignal<ThingType>()

  const changeScreen = (screen: string) => {
    setScreen(screen)
    setArc(undefined)
    setCollection(undefined)
    setThing(undefined)
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
              <Arc
                openArc={(arc: ArcType) => setArc(arc)}
                openThing={(thing: ThingType) => setThing(thing)}
              />
            </ArcContext.Provider>
          </Show>
        </Show>
        <Show when={screen() == "collections"}>
          <Show
            when={collection()}
            fallback={
              <CollectionsList
                openCollection={(collection: CollectionType) =>
                  setCollection(collection)
                }
              />
            }
          >
            <CollectionContext.Provider value={[collection, setCollection]}>
              <div class="screenTitle">
                <h1>{toTitleCase(collection().name)}</h1>
                <button onclick={() => setCollection(undefined)}>Close</button>
              </div>
              <Collection
                openThing={(thing: ThingType) => setThing(thing)}
                openCollection={(sub: CollectionType) => {
                  setCollection(undefined) // Dunno why I have to do this, but it works
                  setCollection(sub)
                }}
              />
            </CollectionContext.Provider>
          </Show>
        </Show>
        <Show when={thing()}>
          <ThingContext.Provider value={[thing, setThing]}>
            <div class="screenTitle">
              <h1>{toTitleCase(thing().name)}</h1>
              <button onclick={() => setThing(undefined)}>Close</button>
            </div>
            <Thing />
          </ThingContext.Provider>
        </Show>
      </main>
    </>
  )
}
