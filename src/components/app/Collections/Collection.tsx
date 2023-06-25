import type { CollectionType, ThingType } from "../lib/types"

import { useContext, createSignal, For, onMount } from "solid-js"
import { CollectionContext, StoryContext } from "../Story"
import { toTitleCase } from "../lib/helpers"
import { collections, setCollections } from "../lib/store"

type CollectionProps = {
  openThing: (thing: ThingType) => void
  openCollection: (collection: CollectionType) => void
}

export default function Collection(props: CollectionProps) {
  const [storyId] = useContext(StoryContext)
  // @ts-ignore
  const [collection, setCollection] = useContext(CollectionContext)
  const [getThings, setThings] = createSignal<ThingType[]>(collection().things)
  const [getSubCollections, setSubCollections] = createSignal<CollectionType[]>(
    collection().subCollections
  )

  onMount(async () => {
    const collectionId = collection().id
    const dbCollection = await fetch(
      `/api/collections/collection/${collectionId}`
    ).then((res) => res.json())
    setCollection(dbCollection)
    setSubCollections(dbCollection.subCollections)
    setThings(dbCollection.things)
  })

  const addThing = async () => {
    const name = prompt("Thing name?")
    if (name) {
      const newThing: ThingType = {
        id: "",
        name,
        information: {},
      }
      const response = await fetch("/api/things/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newThing.name,
          collectionId: collection().id,
        }),
      })
      const data = await response.json()
      const thingId = data.thingId
      newThing.id = thingId

      // @ts-ignore
      collection().things = [...collection().things, newThing]
      setThings(collection().things)
    }
  }

  const addCollection = async () => {
    const name = prompt("Collection name?")
    if (name) {
      const newCollection: CollectionType = {
        id: "",
        name,
        things: [],
        subCollections: [],
        parentId: collection().id,
      }

      const response = await fetch("/api/collections/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCollection.name,
          parentId: newCollection.parentId,
          storyId,
        }),
      })
      const data = await response.json()
      const collectionId = data.collectionId
      newCollection.id = collectionId

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
      elem.id === collection().id ? collection() : elem
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
