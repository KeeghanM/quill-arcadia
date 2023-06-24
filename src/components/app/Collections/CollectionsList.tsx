import { For, createSignal } from "solid-js"
import { collections, setCollections } from "../lib/store"
import type { CollectionType } from "../lib/types"

type CollectionListType = {
  openCollection: (collection: CollectionType) => void
}

export default function CollectionsList(props: CollectionListType) {
  const addCollection = () => {
    const name = prompt("Collection name?")
    if (name) {
      const newCollection: CollectionType = {
        name,
        things: [],
        subCollections: [],
      }
      setCollections([...collections(), newCollection])
    }
  }

  return (
    <>
      <div class="screenTitle">
        <h1>Collections</h1>
        <button onclick={addCollection}>Add New</button>
      </div>
      <ul class="cardContainer bullets">
        <For each={collections()}>
          {(collection: CollectionType) => (
            <li
              class="clickable card"
              onclick={() => props.openCollection(collection)}
            >
              {collection.name}
            </li>
          )}
        </For>
      </ul>
    </>
  )
}
