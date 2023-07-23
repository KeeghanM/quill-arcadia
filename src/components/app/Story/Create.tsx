import { Show, createEffect, createSignal } from "solid-js"
import type { Story } from "../lib/types"
import { setError, setStatus, setStories, status, stories } from "../store"
import Spinner from "../UI/Spinner"

type Props = {
  close: () => void
}

export default function StoryCreate(props: Props) {
  const [storyName, setStoryName] = createSignal("")
  const [valid, setValid] = createSignal(false)
  createEffect(() => {
    setValid(storyName().length > 5 && storyName().length < 20)
  })

  const addStory = async () => {
    setStatus("loading")
    const newStory: Story = {
      id: "0",
      name: storyName(),
      lastEdited: new Date().toLocaleString("en-GB"),
    }
    const response = await fetch("/api/stories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStory),
    })
    if (!response.ok) {
      setError("Failed to create story")
      return
    }
    newStory.id = (await response.json()).id

    setStories([...stories(), newStory])
    setStatus("loaded")
    props.close()
  }

  return (
    <>
      <div
        onclick={() => {
          console.log("test")
          props.close()
        }}
        class="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-10"
      ></div>
      <div class="fixed z-20 top-24 mx-auto left-0 right-0 min-w-[300px] max-w-fit p-6 border rounded-lg shadow border-gray-700 bg-gray-800">
        <h2 class="text-2xl font-bold mb-4">Create new story</h2>
        <div class="mb-6">
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
        <button
          disabled={!valid()}
          class={
            valid()
              ? "bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-600"
              : "bg-gray-700 text-white px-4 py-2 rounded-lg cursor-not-allowed"
          }
          onClick={addStory}
        >
          Create
          <Show when={status() == "loading"}>
            <Spinner />
          </Show>
        </button>
        <button
          onclick={() => {
            props.close()
          }}
          class="bg-gray-700 text-white px-4 py-2 rounded-lg ml-4 hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </>
  )
}
