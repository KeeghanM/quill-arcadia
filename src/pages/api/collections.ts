import type { APIRoute } from "astro"
import { DB } from "./databaseConnection"

export const get: APIRoute = async ({ params, request }) => {
  const results = await DB.execute("SELECT * FROM collections")

  return {
    body: JSON.stringify(results.rows),
  }
}
