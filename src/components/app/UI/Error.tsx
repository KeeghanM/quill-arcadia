import { error } from "../store"

export default function Error() {
  return (
    <div class="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-10">
      <div class="fixed z-20 top-24 mx-auto left-0 right-0 min-w-[300px] max-w-fit p-6 border rounded-lg shadow border-gray-700 bg-gray-800">
        <h2 class="text-2xl font-bold mb-4 text-red-600">
          Oops! Something went wrong
        </h2>
        <p>
          Don't worry, a simple refresh should fix it, plus the dev team have
          already been notified!
        </p>
        <p class="mb-4">
          If the error persists, please contact us at{" "}
          <a
            href="mailto:errors@quillarcadia.com"
            class="text-orange-500 underline"
          >
            errors@quillarcadia.com
          </a>{" "}
          with the following error message:
        </p>
        <p class="mb-4">{error()}</p>
        <button
          class="px-4 py-2 rounded-lg bg-gray-700 text-white font-bold cursor-pointer hover:bg-gray-600"
          onclick={() => {
            window.location.reload()
          }}
        >
          Close & Refresh
        </button>
      </div>
    </div>
  )
}
