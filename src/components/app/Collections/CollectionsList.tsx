import { For } from "solid-js"
import { Collections } from "../lib/dummyValues"
import type { CollectionType } from "../types"

type CollectionListType = {
  openCollection: (collection: CollectionType) => void
}

export default function CollectionsList(props: CollectionListType) {
  const collections: CollectionType[] = Collections
  return (
    <>
      <div class="screenTitle">
        <h1>Collections</h1>
        <button>Add New</button>
      </div>
      <ul class="collectionsList bullets">
        <For each={collections}>
          {(collection: CollectionType) => (
            <li
              class="clickable"
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
