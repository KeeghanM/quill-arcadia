import { createContext, Show } from "solid-js"
import { screen } from "./store"
import Tabs from "./UI/Tabs"
import StoryList from "./Story/List"

type AppProps = {
  userId: string
}

const UserContext = createContext(undefined as string | undefined)

export default function App(props: AppProps) {
  return (
    <UserContext.Provider value={props.userId}>
      <Tabs />
      <Show when={screen() === "stories"}>
        <div class="px-2 py-6 md:py-12">
          <StoryList />
        </div>
      </Show>
    </UserContext.Provider>
  )
}
