import { Arcs } from "../lib/dummyValues"
import type { ArcType } from "../types"
import ArcCard from "./ArcListCard"

type ArcListType = {
  openArc: (arc: ArcType) => void
}

export default function ArcsList(props: ArcListType) {
  const arcs: ArcType[] = Arcs
  return (
    <>
      <div class="screenTitle">
        <h1>Arcs</h1>
        <button>Add New</button>
      </div>
      <div class="cardContainer">
        {arcs.map((arc) => (
          <ArcCard arc={arc} openArc={(arc: ArcType) => props.openArc(arc)} />
        ))}
      </div>
    </>
  )
}
