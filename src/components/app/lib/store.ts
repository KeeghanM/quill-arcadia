import { createSignal } from "solid-js"
import { Arcs, Collections } from "./dummyValues"

import type { ArcType, CollectionType, ThingType } from "./types"

const [arcs, setArcs] = createSignal<ArcType[]>(Arcs)
const [collections, setCollections] =
  createSignal<CollectionType[]>(Collections)

export { arcs, setArcs, collections, setCollections }
