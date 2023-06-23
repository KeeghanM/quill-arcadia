import { createSignal, For } from "solid-js"
import "./App.css"
import Story from "./Story"
import type { StoryType } from "./lib/types"

type AppProps = {
  userId: string
}

export default function App(props: AppProps) {
  const stories = [
    // { id: "1", name: "Jacileon", lastEdit: "10, Jan, 2021" },
    { id: "2", name: "Silverhollow", lastEdit: "15, Jun, 2023" },
    // { id: "3", name: "Feynmere", lastEdit: "12, Aug, 2023" },
  ]

  const [story, setStory] = createSignal<StoryType | undefined>(undefined)

  return (
    <>
      {story() ? (
        <div>
          <Story id={story().id} reset={() => setStory(undefined)} />
        </div>
      ) : (
        <div class="stories">
          <h1>Your stories...</h1>
          <For each={stories}>
            {(story) => (
              <div class="story-card">
                <div class="name">{story.name}</div>
                <div class="edit-date">Last edited: {story.lastEdit}</div>
                <button onclick={() => setStory(story)}>Open Sesame..</button>
              </div>
            )}
          </For>
        </div>
      )}
    </>
  )
}
