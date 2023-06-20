import { createSignal } from "solid-js"
import { Arcs } from "./dummyValues.js"
import "./Story.css"

type storyProps = {
  id: string
  reset: () => void
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

  const arcs = Arcs

  const truncate = (str: string, n: number, useWordBoundary: boolean) => {
    if (str.length <= n) {
      return str
    }
    const subString = str.slice(0, n - 1) // the original check
    return (
      (useWordBoundary
        ? subString.slice(0, subString.lastIndexOf(" "))
        : subString) + "..."
    )
  }

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
          <>
            <div class="screenTitle">
              <h1>Arcs</h1>
              <button class="newArc">Add New</button>
            </div>
            <div class="arcContainer">
              {arcs.map((arc) => (
                <div class="arcCard">
                  <p class="arcName">{arc.name}</p>
                  <p class="arcHook">
                    {truncate(arc.information["hook"], 80, true)}
                  </p>
                  <p class="subArcTitle">Arcs</p>
                  <ul class="subArcs">
                    {arc.SubArcs.map((arc) => {
                      return <li>{arc.name}</li>
                    })}
                  </ul>
                </div>
              ))}
              {arcs.map((arc) => (
                <div class="arcCard">
                  <p class="arcName">{arc.name}</p>
                  <p class="arcHook">
                    {truncate(arc.information["hook"], 80, true)}
                  </p>
                  <p class="subArcTitle">Arcs</p>
                  <ul class="subArcs">
                    {arc.SubArcs.map((arc) => {
                      return <li>{arc.name}</li>
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </>
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
