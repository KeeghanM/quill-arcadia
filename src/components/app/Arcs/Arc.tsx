import { useContext, createSignal, createEffect, For } from "solid-js"
import { ArcContext } from "../Story"

import type { ArcType, CollectionType, ThingType } from "../types"

type ArcProps = {
  openArc: (arc: ArcType) => void
  openThing: (thing: ThingType) => void
}

export default function Arc(props: ArcProps) {
  // @ts-ignore
  const [arc] = useContext(ArcContext)
  const [getCollections, setCollections] = createSignal<CollectionType[]>(
    arc().collections
  )
  const [getCollection, setCollection] = createSignal<
    CollectionType | undefined
  >()
  const [getThings, setThings] = createSignal<ThingType[]>([])

  const addCollection = () => {
    const name = prompt("Collection name?")
    if (name) {
      const newCollection: CollectionType = {
        name,
        things: [],
      }
      setCollections([...getCollections(), newCollection])
      arc().collections = getCollections()
    }
  }

  const addThing = () => {
    const name = prompt("Thing name?")
    if (name) {
      const newThing: ThingType = {
        name,
        information: {},
      }
      // @ts-ignore
      getCollection().things = [...getCollection().things, newThing]
      setCollection(getCollection())
      setThings(getCollection().things)
    }
  }

  createEffect(() => {
    setThings(getCollection() ? getCollection().things : [])
  })

  return (
    <div class="arc">
      <div class="section">
        <h3>SubArcs</h3>
        <ul class="bullets maxHeight">
          <For each={arc().subArcs}>
            {(sub: ArcType) => (
              <li class="clickable" onclick={() => props.openArc(sub)}>
                {sub.name}
              </li>
            )}
          </For>
        </ul>
      </div>
      <div class="section">
        <h3>Information</h3>
        <ul>
          <For each={Object.entries(arc().information)}>
            {([key, value]: [string, unknown]) => (
              <li>
                <span class="key">{key}:</span>
                <span class="value">{String(value)}</span>
              </li>
            )}
          </For>
        </ul>
      </div>
      <div class="section">
        <div class="sectionTitle">
          <h3>Collections</h3>
          <span onclick={addCollection}>+</span>
        </div>
        <ul class="bullets">
          <For each={getCollections()}>
            {(collection: CollectionType) => (
              <li class="clickable" onclick={() => setCollection(collection)}>
                {collection.name}
              </li>
            )}
          </For>
        </ul>
      </div>
      {getCollection() && (
        <div class="section">
          <div class="sectionTitle">
            <h3>{getCollection()?.name}</h3>
            <span onclick={addThing}>+</span>
          </div>
          <ul class="bullets">
            <For each={getThings()}>
              {(thing: ThingType) => (
                <li class="clickable" onclick={() => props.openThing(thing)}>
                  {thing.name}
                </li>
              )}
            </For>
          </ul>
        </div>
      )}
    </div>
  )
}
