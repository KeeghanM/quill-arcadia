import { For, useContext } from "solid-js"
import { collections, setCollections } from "../lib/store"
import type { CollectionType } from "../lib/types"
import { StoryContext } from "../Story"

type CollectionListType = {
  openCollection: (collection: CollectionType) => void
}

export default function CollectionsList(props: CollectionListType) {
  const [storyId] = useContext(StoryContext)

  const addCollection = async () => {
    const name = prompt("Collection name?")
    if (name) {
      const newCollection: CollectionType = {
        id: "",
        name,
        things: [],
        subCollections: [],
      }
      const response = await fetch("/api/collections/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCollection.name,
          storyId,
        }),
      })
      const data = await response.json()
      const collectionId = data.collectionId
      newCollection.id = collectionId
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
