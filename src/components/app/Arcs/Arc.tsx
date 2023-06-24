import { useContext, createSignal, For } from "solid-js"
import { ArcContext } from "../Story"

import type { ArcType, CollectionType, ThingType } from "../lib/types"
import { arcs, setArcs } from "../lib/store"
import { toTitleCase } from "../lib/helpers"
import InformationItem from "../Information/information"

type ArcProps = {
  openArc: (arc: ArcType) => void
  openThing: (thing: ThingType) => void
}

export default function Arc(props: ArcProps) {
  // @ts-ignore
  const [arc, setArc] = useContext(ArcContext)
  const [getCollections, setCollections] = createSignal<CollectionType[]>(
    arc().collections
  )
  const [getThings, setThings] = createSignal<ThingType[]>([])
  const [getSubArcs, setSubArcs] = createSignal<ArcType[]>(arc().subArcs)
  const [getInformation, setInformation] = createSignal(arc().information)

  const [getCollection, setCollection] = createSignal<
    CollectionType | undefined
  >()

  const addSubArc = () => {
    const name = prompt("SubArc name?")
    if (name) {
      const newSubArc: ArcType = {
        id: Date.now().toString() + Math.round(Math.random() * 1000).toString(),
        name,
        subArcs: [],
        information: {
          hook: "",
          goal: "",
          challenge: "",
          antagonist: "",
        },
        collections: [],
      }
      if (!arc().subArcs) arc().subArcs = []
      const updatedArc = { ...arc(), subArcs: [...arc().subArcs, newSubArc] }
      setArc(updatedArc)
    }
  }

  const addInformation = () => {
    const key = prompt("Information Name?")
    const value = prompt("Information Value?")
    if (key && value) {
      const updatedArc = {
        ...arc(),
        information: { ...arc().information, [key]: value },
      }
      setArc(updatedArc)
    }
  }

  const addCollection = () => {
    const name = prompt("Collection name?")
    if (name) {
      const newCollection: CollectionType = {
        id: Date.now().toString() + Math.round(Math.random() * 1000).toString(),
        name,
        things: [],
      }
      const updatedArc = {
        ...arc(),
        collections: [...arc().collections, newCollection],
      }
      setArc(updatedArc)
      setCollections(updatedArc.collections)
    }
  }

  const addThing = () => {
    const name = prompt("Thing name?")
    if (name) {
      const newThing: ThingType = {
        name,
        information: {},
      }
      const updatedCollection = {
        ...getCollection(),
        things: [...getCollection().things, newThing],
      }
      setCollection(updatedCollection)
      setThings(updatedCollection.things)
    }
  }

  const closeArc = () => {
    const updatedArcs = arcs().map((elem) =>
      elem.id === arc().id ? arc() : elem
    )
    setArcs(updatedArcs)
    setArc(undefined)
  }

  return (
    <>
      <div class="screenTitle">
        <h1>{toTitleCase(arc().name)}</h1>
        <button onclick={closeArc}>Close</button>
      </div>
      <div class="header">
        <div class="sectionTitle">
          <h3>Information</h3>
          <span onclick={addInformation}>+</span>
        </div>
        <ul>
          <For each={Object.entries(arc().information)}>
            {([key, value]: [string, unknown]) => (
              <InformationItem information={{ key, value: String(value) }} />
            )}
          </For>
        </ul>
      </div>
      <div class="cardContainer">
        <div class="card">
          <div class="sectionTitle">
            <h3>SubArcs</h3>
            <span onclick={addSubArc}>+</span>
          </div>
          <ul class="bullets">
            <For each={arc().subArcs}>
              {(sub: ArcType) => (
                <li class="clickable" onclick={() => props.openArc(sub)}>
                  {sub.name}
                </li>
              )}
            </For>
          </ul>
        </div>
        <div class="card">
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
          <div class="card">
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
    </>
  )
}
