import { useContext } from "solid-js"
import { ArcContext } from "./Story"

import type { ArcType } from "./types"
type ArcProps = {
  openArc: (arc: ArcType) => void
}
export default function Arc(props: ArcProps) {
  // @ts-ignore
  const [arc] = useContext(ArcContext)

  return (
    <div class="arc cardContainer">
      {arc()?.SubArcs ? (
        <div class="section">
          <h2>SubArcs</h2>
          <ul class="subArcs">
            {arc().SubArcs.map((sub: ArcType) => (
              <li class="clickable" onclick={() => props.openArc(sub)}>
                {sub.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div class="section">
        <h2>Information</h2>
        <ul>
          {Object.entries(arc()?.information).map(([key, value]) => (
            <li>
              <span class="key">{key}:</span>
              <span class="value">{String(value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
