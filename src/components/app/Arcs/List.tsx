import { createSignal, onMount, createEffect, JSXElement } from "solid-js"
import { arcs, currentStory, setArcs, setCurrentArc, search } from "../store"
import type { Arc } from "../lib/types"

export default function ArcsList() {
  const [arcList, setArcList] = createSignal<JSXElement[]>([])

  const recurrentArc = (arc: Arc): JSXElement => {
    const subArcs = arcs().filter((a) => a.parentId === arc.id)
    return arc.name.toLowerCase().includes(search().toLowerCase()) ? (
      <>
        <li class="flex flex-col gap-2 bg-[rgba(115,115,115,0.1)] border border-gray-600 rounded-lg m-2 cursor-pointer">
          <span
            onclick={() => setCurrentArc(arc)}
            class={
              "p-4 border-b-2 border-transparent text-white hover:text-orange-500" +
              (subArcs.length > 0 ? " pb-0" : "")
            }
          >
            {arc.name}
          </span>
          {subArcs.length === 0 ? null : (
            <ul>{subArcs.map((subArc) => recurrentArc(subArc))}</ul>
          )}
        </li>
      </>
    ) : (
      subArcs.map((subArc) => recurrentArc(subArc))
    )
  }

  createEffect(() => {
    const newArcList = arcs()
      .filter((arc) => !arc.parentId)
      .map((arc) => recurrentArc(arc))
    setArcList(newArcList)
  })

  onMount(async () => {
    const response = await fetch(`/api/arcs/${currentStory()?.id}`)
    if (!response.ok) throw new Error("Failed to fetch arcs")

    const data = await response.json()
    if (!data) throw new Error("Failed to parse arcs")

    setArcs(data)
  })

  return <ul class="overflow-y-auto h-[50vh]">{arcList()}</ul>
}
