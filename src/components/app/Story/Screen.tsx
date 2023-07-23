import { Show, createEffect, createSignal } from "solid-js"
import {
  currentStory,
  setCurrentStory,
  setError,
  setScreen,
  setStatus,
  status,
} from "../store"
import type { Story } from "../lib/types"
import Spinner from "../UI/Spinner"

export default function StoryScreen() {
  const [storyName, setStoryName] = createSignal(currentStory()?.name || "")
  const [valid, setValid] = createSignal(false)
  const [buttonPressed, setButtonPressed] = createSignal(
    "" as undefined | "save" | "delete"
  )
  createEffect(() => {
    setValid(storyName().length > 5 && storyName().length < 20)
  })

  const updateStory = async () => {
    setButtonPressed("save")
    setStatus("loading")
    const response = await fetch("/api/stories/" + currentStory()?.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: storyName(),
        lastEdited: new Date().toLocaleString("en-GB"),
      }),
    })
    if (!response.ok) {
      setError("Failed to update story")
      return
    }
    const updatedStory: Story = await response.json()
    setCurrentStory(updatedStory)
    setStatus("loaded")
  }

  const deleteStory = async () => {
    setButtonPressed("delete")
    setStatus("loading")
    const response = await fetch("/api/stories/" + currentStory()?.id, {
      method: "DELETE",
    })
    if (!response.ok) {
      setError("Failed to delete story")
      return
    }
    setStatus("loaded")
    setScreen("stories")
    setCurrentStory(undefined)
  }

  return (
    <div class="mx-auto max-w-md">
      <div class="mb-4">
        <label
          for="story-name"
          class="block mb-2 text-sm font-medium ext-white"
        >
          Story Name
        </label>
        <input
          name="story-name"
          type="text"
          class="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-orange-500 focus:border-orange-500"
          required
          value={storyName()}
          onInput={(e) => setStoryName(e.currentTarget.value)}
        />
      </div>
      <div class="flex gap-2 mb-2">
        <button
          disabled={!valid()}
          class="bg-lime-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-lime-700 w-1/2"
          onClick={updateStory}
        >
          Save
          <Show when={status() == "loading" && buttonPressed() == "save"}>
            <Spinner />
          </Show>
        </button>
        <button
          onclick={deleteStory}
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-1/2"
        >
          Delete
          <Show when={status() == "loading" && buttonPressed() == "delete"}>
            <Spinner />
          </Show>
        </button>
      </div>

      <button
        onclick={() => {
          setScreen("stories")
          setCurrentStory(undefined)
        }}
        class="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full"
      >
        Close
      </button>
    </div>
  )
}
