import type { Story } from "../lib/types"

import { For, Show, createSignal, onMount } from "solid-js"
import { stories, setStories, setStatus, status } from "../store"
import StoryCard from "./Card"
import StoryCreate from "./Create"

export default function StoryList() {
  const [create, setCreate] = createSignal(false)
  const placeHolders = [...Array(4)]

  onMount(async () => {
    setStatus("loading")
    const stories: Story[] = await fetch("/api/stories").then((res) =>
      res.json()
    )
    setStories(stories)
    setStatus("loaded")
  })

  return (
    <>
      <div class="flex gap-4 md:gap-6 flex-col md:flex-row flex-wrap mx-auto w-fit">
        <Show when={status() == "loading"}>
          <For each={placeHolders}>{() => <StoryCard story={undefined} />}</For>
        </Show>
        <Show when={status() == "loaded"}>
          <For each={stories()}>
            {(story: Story) => <StoryCard story={story} />}
          </For>
          <div class="max-w-sm p-6 border rounded-lg shadow border-gray-700  bg-gray-800">
            <h5
              onclick={() => setCreate(true)}
              class="mb-2 text-2xl font-bold tracking-tight text-white cursor-pointer"
            >
              A blank book..
            </h5>
            <p class="mb-3 font-normal  text-gray-400">What will you create?</p>
            <button
              onclick={() => setCreate(true)}
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg ocus:ring-4 focus:outline-none bg-orange-500 hover:bg-orange-700 focus:ring-orange-800 cursor-pointer"
            >
              Create new
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </Show>
      </div>
      <Show when={create()}>
        <StoryCreate close={() => setCreate(false)} />
      </Show>
    </>
  )
}
