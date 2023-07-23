import { createSignal } from "solid-js"
import type { Arc, Collection, Story } from "./lib/types"

const [stories, setStories] = createSignal<Story[]>([])
const [currentStory, setCurrentStory] = createSignal<Story | undefined>(
  undefined
)
const [arcs, setArcs] = createSignal<Arc[]>([])
const [currentArc, setCurrentArc] = createSignal<Arc | undefined>(undefined)
const [collections, setCollections] = createSignal<Collection[]>([])
const [currentCollection, setCurrentCollection] = createSignal<
  Collection | undefined
>(undefined)
const [error, setError] = createSignal<string | undefined>(undefined)
const [status, setStatus] = createSignal(
  "loading" as "loading" | "loaded" | "error" | "saving" | "saved" | "error"
)
const [screen, setScreen] = createSignal(
  "stories" as
    | "stories"
    | "story"
    | "arcs"
    | "arc"
    | "collections"
    | "collection"
)

export {
  stories,
  setStories,
  currentStory,
  setCurrentStory,
  arcs,
  setArcs,
  currentArc,
  setCurrentArc,
  collections,
  setCollections,
  currentCollection,
  setCurrentCollection,
  status,
  setStatus,
  screen,
  setScreen,
  error,
  setError,
}
