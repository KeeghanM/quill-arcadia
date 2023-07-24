import { onMount } from "solid-js"
import { setArcs, currentStory } from "../store"
import ArcsList from "./ArcsList"
import Arc from "./Arc"

export default function ArcScreen() {
  return (
    <div class="md:mx-12 lg:mx-24 border rounded-lg shadow border-gray-700 bg-gray-800 grid grid-cols-[300px_1fr]">
      <div class="flex flex-col gap-2 border-r border-gray-700">
        <h2 class="text-2xl font-bold w-full border-b border-gray-700 p-6 text-orange-500">
          Arcs
        </h2>
        <ArcsList />
      </div>
      <Arc />
    </div>
  )
}
