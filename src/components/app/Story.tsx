import { createSignal } from "solid-js"
import "./Story.css"

type storyProps = {
  id: string
  reset: () => null
}

export default function Story(props: storyProps) {
  const id = props.id
  const exit = props.reset

  const [screen, setScreen] = createSignal("Arcs")

  const sidebarItems = [
    { name: "Arcs", screenId: "arcs" },
    { name: "Collections", screenId: "collections" },
    { name: "Things", screenId: "things" },
  ]

  return (
    <>
      <ul class="sidebar">
        {sidebarItems.map((item) => (
          <li onclick={() => setScreen(item.screenId)}>{item.name}</li>
        ))}
        <li>
          <button onclick={exit}>Close Story</button>
        </li>
      </ul>
      <main></main>
    </>
  )
}
