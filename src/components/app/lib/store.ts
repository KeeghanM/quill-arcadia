import { createSignal } from "solid-js"
import { Arcs, Collections } from "./dummyValues"

import type { ArcType, CollectionType, ThingType } from "./types"

const [arcs, setArcs] = createSignal<ArcType[]>(Arcs)
const [collections, setCollections] =
  createSignal<CollectionType[]>(Collections)
const [status, setStatus] = createSignal(
  "loading" as "loading" | "loaded" | "error" | "saving" | "saved" | "error"
)

export { arcs, setArcs, collections, setCollections, status, setStatus }
