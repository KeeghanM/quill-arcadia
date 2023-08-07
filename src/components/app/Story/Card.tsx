import type { Story } from "../lib/types"
import { currentStory, setCurrentStory, setScreen } from "../store"

type Props = {
  story: Story | undefined
}

export default function StoryCard(props: Props) {
  const openStory = () => {
    if (!props.story) return

    setCurrentStory(props.story)
    setScreen("arcs")
  }

  return (
    <div
      class={
        "max-w-sm p-6 border rounded-lg shadow border-gray-700" +
        (props.story && props.story?.name === currentStory()?.name
          ? "  bg-lime-800"
          : " bg-gray-800")
      }
    >
      <h5
        onclick={openStory}
        class="mb-2 text-2xl font-bold tracking-tight text-white cursor-pointer"
      >
        {props.story ? props.story.name : "Loading.."}
      </h5>
      <p class="mb-3 font-normal  text-gray-400">
        {props.story ? props.story.lastEdited : "Loading.."}
      </p>
      <button
        disabled={!props.story}
        onclick={openStory}
        class={
          "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg ocus:ring-4 focus:outline-none" +
          (props.story
            ? " bg-lime-500 hover:bg-lime-700 focus:ring-lime-800 cursor-pointer"
            : " bg-gray-700 cursor-default")
        }
      >
        {props.story ? "Open Sesame.." : "Loading.."}
        <svg
          class="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  )
}
