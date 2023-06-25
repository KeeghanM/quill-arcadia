import type { APIRoute } from "astro"
import { DB } from "../databaseConnection"
import { getSession } from "auth-astro/server"

export const post: APIRoute = async ({ params, request }) => {
  let session = await getSession(request)
  if (session) {
    const { name, collectionId } = await request.json()

    const result = await DB.execute(
      `INSERT INTO things (name, collection_id) VALUES (?, ?)`,
      [name, collectionId]
    )

    const thingId = result.insertId

    return new Response(JSON.stringify({ message: "success", thingId }), {
      status: 200,
    })
  }
  return new Response(null, { status: 401 })
}
