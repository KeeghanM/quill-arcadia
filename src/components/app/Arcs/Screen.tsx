import ArcsList from "./List"
import Arc from "./Arc"
import ArcSearch from "./Search"

export default function ArcScreen() {
  return (
    <div class="md:mx-12 lg:mx-24 border rounded-lg shadow border-gray-700 bg-gray-800 grid grid-cols-[300px_1fr]">
      <div class="flex flex-col gap-2 border-r border-gray-700">
        <div class="flex gap-2 items-center w-full border-b border-gray-700 p-6 text-orange-500">
          <h2 class="text-2xl font-bold ">Arcs</h2>
          <ArcSearch />
        </div>
        <ArcsList />
      </div>
      <Arc />
    </div>
  )
}
