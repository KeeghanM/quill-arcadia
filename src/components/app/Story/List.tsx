import type { Story } from "../lib/types"

import { For, Show, onMount } from "solid-js"
import { stories, setStories } from "../store"
import StoryCard from "./Card"

export default function StoryList() {
  const placeHolders = [...Array(4)]

  onMount(async () => {
    const stories: Story[] = await fetch("/api/stories").then((res) =>
      res.json()
    )
    setStories(stories)
  })

  return (
    <div class="flex gap-4 md:gap-6 flex-col md:flex-row flex-wrap mx-auto w-fit">
      <Show when={stories().length === 0}>
        <For each={placeHolders}>{() => <StoryCard story={undefined} />}</For>
      </Show>
      <For each={stories()}>
        {(story: Story) => <StoryCard story={story} />}
      </For>
    </div>
  )
}
