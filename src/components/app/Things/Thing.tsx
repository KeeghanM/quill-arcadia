import { useContext, For } from "solid-js"
import { toTitleCase } from "../lib/helpers"
import { ThingContext } from "../Story"

export default function Thing() {
  // @ts-ignore
  const [thing, setThing] = useContext(ThingContext)

  const addInformation = () => {
    const name = prompt("Information name?")
    const content = prompt("Information value?")

    if (name && content) {
      const newInformation: Record<string, unknown> = {
        ...thing().information,
        [name]: content,
      }

      thing().information = newInformation
    }
  }

  return (
    <div class="thingContainer">
      <div class="thing">
        <div class="thingTitle">
          <h1>{toTitleCase(thing().name)}</h1>
          <button onclick={() => setThing(undefined)}>Close</button>
        </div>
        <div class="section">
          <div class="sectionTitle">
            <h3>Information</h3>
            <span onclick={addInformation}>+</span>
          </div>
          <ul class="bullets">
            <For each={Object.entries(thing().information)}>
              {([name, content]: [string, unknown]) => (
                <li>
                  <span class="name">{toTitleCase(name)}:</span>
                  <span class="content">{String(content)}</span>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </div>
  )
}
