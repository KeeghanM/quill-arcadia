import { createEffect, createSignal, onMount } from "solid-js"
import { currentArc, status, setStatus } from "../store"
import type { Arc } from "../lib/types"
import { toTitleCase } from "../lib/helpers"
import Spinner from "../UI/Spinner"

export default function Arc() {
  const [information, setInformation] = createSignal<
    { key: string; value: string }[]
  >([])
  const [collections, setCollections] = createSignal<
    { id: string; name: string }[]
  >([])
  const [subArcs, setSubArcs] = createSignal<Arc[]>([])

  const loadArc = async () => {
    setStatus("loading")
    setInformation([])
    setCollections([])
    setSubArcs([])

    const response = await fetch(`api/arcs/arc/${currentArc()!.id}`)
    if (!response.ok) throw new Error("Failed to fetch arc")

    const arc = await response.json()
    if (!arc) throw new Error("Failed to parse arc")

    setInformation(arc.information || [])
    setCollections(arc.collections || [])
    setSubArcs(arc.subArcs || [])

    setStatus("loaded")
  }

  onMount(loadArc)
  createEffect(loadArc)

  return (
    <>
      <div class="mb-4 flex gap-2">
        <input
          type="text"
          class="text-xl rounded-lg block w-64 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500"
          required
          value={currentArc()!.name}
        />
        <button class="px-4 py-2 rounded-lg bg-lime-600 hover:bg-lime-700 text-white w-fit">
          Save
          {status() === "saving" ? <Spinner /> : null}
        </button>
      </div>

      <div class="mb-4 p-4 border border-gray-700 rounded-lg bg-[rgba(115,115,115,0.1)]">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {status() === "loading" ? <Spinner /> : null}
          {information().map((info) => (
            <div>
              <p class="block mb-2 text-xl font-medium text-white">
                {toTitleCase(info.key)}
              </p>
              <textarea
                rows="3"
                class="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500"
                value={info.value}
              />
            </div>
          ))}
          <div>
            <p class="block mb-2 text-xl font-medium text-white">
              Add New Information
            </p>
            <textarea
              rows="3"
              class="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500"
            />
            <button class="mt-2 px-4 py-2 rounded-lg bg-orange-500 text-white">
              Add
            </button>
          </div>
        </div>
      </div>

      <div class="flex gap-4">
        <div class="mb-4 flex-1">
          <p class="block mb-2 text-xl font-medium text-white">Collections</p>
          <div class="p-4 border border-gray-700 rounded-lg bg-[rgba(115,115,115,0.1)] grid grid-cols-2 gap-4">
            {status() === "loading" ? <Spinner /> : null}
            {collections().map((collection) => (
              <div>
                <p class="block mb-2 text-xl font-medium text-white">
                  {collection.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div class="mb-4 flex-1">
          <p class="block mb-2 text-xl font-medium text-white">Sub Arcs</p>
          <div class="p-4 border border-gray-700 rounded-lg bg-[rgba(115,115,115,0.1)] grid grid-cols-2 gap-4">
            {status() === "loading" ? <Spinner /> : null}
            {subArcs().map((subArc) => (
              <div>
                <p class="block mb-2 text-xl font-medium text-white">
                  {subArc.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
