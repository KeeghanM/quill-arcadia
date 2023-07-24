import { setSearch } from "../store"

export default function ArcSearch() {
  return (
    <input
      class="p-3 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white shadow-sm-light"
      type="text"
      oninput={(e) => setSearch(e.currentTarget.value)}
    />
  )
}
