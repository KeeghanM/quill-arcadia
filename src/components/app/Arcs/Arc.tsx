import { currentArc } from "../store"

export default function Arc() {
  return <div>{currentArc()?.name}</div>
}
