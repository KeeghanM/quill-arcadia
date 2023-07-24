import { JSXElement, createSignal, onMount } from "solid-js"
import { arcs, currentStory, setArcs, setCurrentArc } from "../store"
import type { Arc } from "../lib/types"

export default function ArcsList() {
  const [arcList, setArcList] = createSignal<JSXElement[]>([])

  const recurrentArc = (arc: Arc): JSXElement => {
    const subArcs = arcs().filter((a) => a.parentId === arc.id)
    return (
      <>
        <li class="flex flex-col gap-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg m-2 cursor-pointer">
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
    )
  }

  onMount(async () => {
    const response = await fetch(`/api/arcs/${currentStory()?.id}`)
    if (!response.ok) throw new Error("Failed to fetch arcs")

    const data = await response.json()
    if (!data) throw new Error("Failed to parse arcs")

    setArcs(data)

    arcs().map((arc) => {
      if (arc.parentId) return
      setArcList([...arcList(), recurrentArc(arc)])
    })
  })

  return <ul class="overflow-y-auto h-[50vh]">{arcList()}</ul>
}
