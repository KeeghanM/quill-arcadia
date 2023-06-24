import { createSignal } from "solid-js"

import type { ArcType, CollectionType } from "./types"

const [arcs, setArcs] = createSignal<ArcType[]>([])
const [collections, setCollections] = createSignal<CollectionType[]>([])
const [status, setStatus] = createSignal(
  "loading" as "loading" | "loaded" | "error" | "saving" | "saved" | "error"
)

export { arcs, setArcs, collections, setCollections, status, setStatus }
