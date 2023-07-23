import { currentStory, screen, setScreen } from "../store"

export default function Tabs() {
  const classes = {
    "active":
      "inline-block p-4 text-orange-500 border-b-2 border-orange-500 rounded-t-lg active",
    "disabled":
      "inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500",
    "default":
      "inline-block p-4 border-b-2 border-transparent rounded-t-lg text-white hover:text-orange-300 hover:border-orange-300",
  }

  const navigateToHome = () => {
    const confirm = window.confirm("Are you sure you want to leave this page?")
    if (confirm) {
      window.location.href = "/"
    }
  }
  return (
    <div class="md:text-xl font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <h1
        onclick={navigateToHome}
        class="text-4xl text-white hover:text-orange-500 cursor-pointer font-semibold font-serif mt-4 mb-2"
      >
        QuillArcadia
      </h1>
      <ul class="flex flex-wrap -mb-px w-fit mx-auto">
        <li class="mr-2">
          <button
            onclick={() => setScreen("stories")}
            class={screen() === "stories" ? classes.active : classes.default}
          >
            Stories
          </button>
        </li>
        <li class="mr-2">
          <button
            onclick={() => setScreen("story")}
            disabled={!currentStory()}
            class={
              !currentStory()
                ? classes.disabled
                : screen() === "story"
                ? classes.active
                : classes.default
            }
          >
            Story
          </button>
        </li>
        <li class="mr-2">
          <button
            onclick={() => setScreen("arcs")}
            disabled={!currentStory()}
            class={
              !currentStory()
                ? classes.disabled
                : screen() === "arcs"
                ? classes.active
                : classes.default
            }
          >
            Arcs
          </button>
        </li>
        <li class="mr-2">
          <button
            onclick={() => setScreen("collections")}
            disabled={!currentStory()}
            class={
              !currentStory()
                ? classes.disabled
                : screen() === "collections"
                ? classes.active
                : classes.default
            }
          >
            Collections
          </button>
        </li>
      </ul>
    </div>
  )
}
