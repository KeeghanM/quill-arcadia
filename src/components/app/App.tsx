import { createContext, createSignal, For, onMount, Show } from "solid-js"
import "./App.css"
import Story from "./Story"
import type { StoryType } from "./lib/types"

type AppProps = {
  userId: string
}

const UserContext = createContext(undefined as string | undefined)

export default function App(props: AppProps) {
  const [stories, setStories] = createSignal<StoryType[]>([])
  const [story, setStory] = createSignal<StoryType | undefined>(undefined)

  onMount(async () => {
    const stories = await fetch("/api/stories").then((res) => res.json())
    setStories(stories)
  })

  const addStory = async () => {
    const name = prompt("Story name?")
    if (name) {
      const newStory: StoryType = {
        id: Date.now().toString() + Math.round(Math.random() * 1000).toString(),
        name,
        lastEdited: new Date().toLocaleString(),
      }
      await fetch("/api/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStory),
      })
      setStories([...stories(), newStory])
    }
  }

  return (
    <Show
      when={story()}
      fallback={
        <div class="stories">
          <div class="screenTitle">
            <h1>Your stories...</h1>
            <button onclick={addStory}>New Story</button>
          </div>
          <For each={stories()}>
            {(story) => (
              <div class="story-card">
                <div class="name">{story.name}</div>
                <div class="edit-date">Last edited: {story.lastEdited}</div>
                <button onclick={() => setStory(story)}>Open Sesame..</button>
              </div>
            )}
          </For>
        </div>
      }
    >
      <UserContext.Provider value={props.userId}>
        <Story id={story().id} reset={() => setStory(undefined)} />
      </UserContext.Provider>
    </Show>
  )
}
