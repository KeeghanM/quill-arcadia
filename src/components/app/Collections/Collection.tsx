import type { CollectionType, ThingType } from "../lib/types"

import { useContext, createSignal, For } from "solid-js"
import { CollectionContext } from "../Story"
import { toTitleCase } from "../lib/helpers"
import { collections, setCollections } from "../lib/store"

type CollectionProps = {
  openThing: (thing: ThingType) => void
  openCollection: (collection: CollectionType) => void
}

export default function Collection(props: CollectionProps) {
  // @ts-ignore
  const [collection, setCollection] = useContext(CollectionContext)
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
        id: Date.now().toString() + Math.round(Math.random() * 1000).toString(),
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

  const closeCollection = () => {
    const updatedCollections = collections().map((elem: CollectionType) =>
      elem.id === collections().id ? collections() : elem
    )
    setCollections(updatedCollections)
    setCollection(undefined)
  }

  return (
    <>
      <div class="screenTitle">
        <h1>{toTitleCase(collection().name)}</h1>
        <button onclick={closeCollection}>Close</button>
      </div>
      <div class="header">
        <div class="sectionTitle">
          <h3>Things</h3>
          <span onclick={addThing}>+</span>
        </div>
        <ul>
          <For each={getThings()}>
            {(thing: ThingType) => (
              <li
                class="information clickable"
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
      <div class="cardContainer">
        <div class="card">
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
    </>
  )
}
