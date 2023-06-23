import { useContext, For } from "solid-js"
import { toTitleCase } from "../lib/helpers"
import { ThingContext } from "../Story"

export default function Thing() {
  // @ts-ignore
  const [thing] = useContext(ThingContext)

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
    <div class="thing">
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
  )
}
