type InformationProps = {
  information: { key: string; value: string }
}
import { toTitleCase, truncate } from "../lib/helpers"

export default function InformationItem(props: InformationProps) {
  return (
    <li class="information">
      <span class="key">{toTitleCase(props.information.key)}</span>
      <span class="value">{truncate(props.information.value, 100, true)}</span>
    </li>
  )
}
