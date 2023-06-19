import { createSignal } from "solid-js"
import "./Story.css"

type storyProps = {
  id: string
  reset: () => null
}

export default function Story(props: storyProps) {
  const id = props.id
  const exit = props.reset

  const [screen, setScreen] = createSignal("arcs")

  const sidebarItems = [
    { name: "Arcs", screenId: "arcs" },
    { name: "Collections", screenId: "collections" },
    { name: "Things", screenId: "things" },
  ]

  const arcs = [
    {
      name: "Intro",
      information: {
        hook: "",
        goal: "",
        challenge: "",
        antagonist: "",
      },
      collections: [],
    },
  ]

  return (
    <>
      <ul class="sidebar">
        {sidebarItems.map((item) => (
          <li onclick={() => setScreen(item.screenId)}>{item.name}</li>
        ))}
        <li class="close">
          <button onclick={exit}>Close Story</button>
        </li>
      </ul>
      <main>
        {screen() == "arcs" ? (
          <p>Arcs</p>
        ) : screen() == "collections" ? (
          <p>Collections</p>
        ) : screen() == "things" ? (
          <p>Things</p>
        ) : (
          <p>Select a screen...</p>
        )}
      </main>
    </>
  )
}
