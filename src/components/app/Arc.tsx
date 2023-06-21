import type { ArcType } from "./types"
type ArcProps = {
  arc: ArcType
  openArc: (arc: ArcType) => void
}
export default function Arc(props: ArcProps) {
  const arc = props.arc
  console.log(arc)
  return (
    <div class="arc cardContainer">
      <div class="section">
        <h2>SubArcs</h2>
        <ul class="subArcs">
          {arc?.SubArcs?.map((sub) => (
            <li onclick={() => props.openArc(sub)}>{sub.name}</li>
          ))}
        </ul>
      </div>

      <div class="section">
        <h2>Information</h2>
        <ul>
          {Object.entries(arc.information).map(([key, value]) => (
            <li>
              <span class="key">{key}:</span>
              <span class="value">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
