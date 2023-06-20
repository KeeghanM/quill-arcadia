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

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
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
        <div class="screenTitle">
          <h1>{toTitleCase(screen())}</h1>
          <button class="newButton">Add New</button>
        </div>
        <div class="cardContainer">
          {screen() == "arcs" ? (
            <>
              {arcs.map((arc) => (
                <div class="card">
                  <p class="cardName" onclick={() => alert(arc.name)}>
                    {arc.name}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h14v-7h2v7q0 .825-.588 1.413T19 21H5Zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4l-9.3 9.3Z"
                      />
                    </svg>
                  </p>
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
            </>
          ) : screen() == "collections" ? (
            <p>Collections</p>
          ) : (
            <p>Select a screen...</p>
          )}
        </div>
      </main>
    </>
  )
}
