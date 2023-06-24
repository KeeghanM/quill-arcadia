import { For, useContext } from "solid-js"

import { arcs, setArcs } from "../lib/store"
import type { ArcType } from "../lib/types"
import ArcCard from "./ArcListCard"
import { StoryContext } from "../Story"

type ArcListType = {
  openArc: (arc: ArcType) => void
}

export default function ArcsList(props: ArcListType) {
  const [storyId] = useContext(StoryContext)

  const addArc = async () => {
    const name = prompt("Arc name?")
    if (name) {
      const newArc: ArcType = {
        id: "",
        name,
        information: {
          hook: "",
          goal: "",
          challenge: "",
          antagonist: "",
        },
        subArcs: [],
        collections: [],
      }
      const response = await fetch("/api/arcs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newArc.name,
          information: newArc.information,
          storyId,
        }),
      })
      const data = await response.json()
      const arcId = data.arcId

      newArc.id = arcId

      setArcs([...arcs(), newArc])
    }
  }

  return (
    <>
      <div class="screenTitle">
        <h1>Arcs</h1>
        <button onclick={addArc}>Add New</button>
      </div>
      <div class="cardContainer">
        <For each={arcs()}>
          {(arc: ArcType) => (
            <ArcCard arc={arc} openArc={(arc: ArcType) => props.openArc(arc)} />
          )}
        </For>
      </div>
    </>
  )
}
