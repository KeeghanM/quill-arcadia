import { createSignal } from "solid-js"
import "./App.css"
import Story from "./Story"

export default function App(props) {
  console.log(props.userId)
  const stories = [
    // { id: "1", name: "Jacileon", lastEdit: "10, Jan, 2021" },
    { id: "2", name: "Silverhollow", lastEdit: "15, Jun, 2023" },
    // { id: "3", name: "Feynmere", lastEdit: "12, Aug, 2023" },
  ]

  const [story, setStory] = createSignal("")

  return (
    <>
      {story() ? (
        <div>
          <Story id={story()} reset={() => setStory("")} />
        </div>
      ) : (
        <div class="stories">
          <h1>Your stories...</h1>
          {stories.map((story) => (
            <div class="story-card">
              <div class="name">{story.name}</div>
              <div class="edit-date">Last edited: {story.lastEdit}</div>
              <button onclick={() => setStory(story.id)}>Open Sesame..</button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
