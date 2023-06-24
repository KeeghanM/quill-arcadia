import { For } from "solid-js"

import type { ArcType } from "../lib/types"
import { truncate } from "../lib/helpers"
type arcCardProps = {
  arc: ArcType
  openArc: (arc: ArcType) => void
}

export default function ArcCard(props: arcCardProps) {
  const arc = props.arc
  const openArc = props.openArc

  return (
    <div class="card">
      <p class="cardName" onclick={() => openArc(arc)}>
        {arc.name}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h14v-7h2v7q0 .825-.588 1.413T19 21H5Zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4l-9.3 9.3Z"
          />
        </svg>
      </p>
      <p class="arcHook">
        {arc.information["hook"]
          ? truncate(arc.information["hook"], 80, true)
          : null}
      </p>
      <p class="subArcTitle">Arcs</p>
      <ul class="subArcs">
        <For each={arc.subArcs}>
          {(subArc) => (
            <li class="clickable" onclick={() => openArc(subArc)}>
              {subArc.name}
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}
