import { createSignal, For } from "solid-js"

import { Arcs } from "../lib/dummyValues"
import type { ArcType } from "../types"
import ArcCard from "./ArcListCard"

type ArcListType = {
  openArc: (arc: ArcType) => void
}

export default function ArcsList(props: ArcListType) {
  const [arcs, setArcs] = createSignal<ArcType[]>(Arcs)

  const addArc = () => {
    const name = prompt("Arc name?")
    if (name) {
      const newArc: ArcType = {
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
      setArcs([...arcs(), newArc])
      console.log(arcs())
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
