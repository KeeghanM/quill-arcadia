import { createContext, Show } from "solid-js"
import { error, screen } from "./store"
import Tabs from "./UI/Tabs"
import StoryList from "./Story/List"
import StoryScreen from "./Story/Screen"
import Error from "./UI/Error"

type AppProps = {
  userId: string
}

const UserContext = createContext(undefined as string | undefined)

export default function App(props: AppProps) {
  return (
    <UserContext.Provider value={props.userId}>
      <Show when={error()}>
        <Error />
      </Show>
      <Tabs />
      <div class="px-2 py-6 md:py-12">
        <Show when={screen() === "stories"}>
          <StoryList />
        </Show>
        <Show when={screen() === "story"}>
          <StoryScreen />
        </Show>
      </div>
    </UserContext.Provider>
  )
}
