import { useContext, createSignal, For } from "solid-js"
import { CollectionContext } from "../Story"

import type { CollectionType, ThingType } from "../types"

type CollectionProps = {
  openThing: (thing: ThingType) => void
  openCollection: (collection: CollectionType) => void
}

export default function Collection(props: CollectionProps) {
  // @ts-ignore
  const [collection] = useContext(CollectionContext)
  const [getThings, setThings] = createSignal<ThingType[]>(collection().things)
  const [getSubCollections, setSubCollections] = createSignal<CollectionType[]>(
    collection().subCollections
  )

  const addThing = () => {
    const name = prompt("Thing name?")
    if (name) {
      const newThing: ThingType = {
        name,
        information: {},
      }
      // @ts-ignore
      collection().things = [...collection().things, newThing]
      setThings(collection().things)
    }
  }

  const addCollection = () => {
    const name = prompt("Collection name?")
    if (name) {
      const newCollection: CollectionType = {
        name,
        things: [],
        subCollections: [],
      }
      if (!collection().subCollections) collection().subCollections = []
      // @ts-ignore
      collection().subCollections = [
        ...collection().subCollections,
        newCollection,
      ]
      setSubCollections(collection().subCollections)
    }
  }

  return (
    <div class="collection">
      <div class="section">
        <div class="sectionTitle">
          <h3>Things</h3>
          <span onclick={addThing}>+</span>
        </div>
        <ul class="bullets">
          <For each={getThings()}>
            {(thing: ThingType) => (
              <li
                class="clickable"
                onclick={() => {
                  props.openThing(thing)
                }}
              >
                {thing.name}
              </li>
            )}
          </For>
        </ul>
      </div>
      <div class="section">
        <div class="sectionTitle">
          <h3>SubCollections</h3>
          <span onclick={addCollection}>+</span>
        </div>
        <ul class="bullets">
          <For each={getSubCollections()}>
            {(sub: CollectionType) => (
              <li
                class="clickable"
                onclick={() => {
                  props.openCollection(sub)
                }}
              >
                {sub.name}
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  )
}
