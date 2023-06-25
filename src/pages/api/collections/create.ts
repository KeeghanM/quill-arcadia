import type { APIRoute } from "astro"
import { DB } from "../databaseConnection"
import { getSession } from "auth-astro/server"

export const post: APIRoute = async ({ params, request }) => {
  let session = await getSession(request)
  if (session) {
    const { name, storyId, parentId } = await request.json()
    const user = await DB.execute("SELECT id FROM users WHERE user_id = ?", [
      session.session.user.id,
    ])
    if (user.rows.length === 0) {
      throw new Error(`No user found with user_id ${session.session.user.id}`)
    }

    let collection

    if (parentId) {
      collection = await DB.execute(
        `INSERT INTO collections (name, story_id, user_id, parent_collection_id) VALUES (?, ?, ?, ?)`,
        [name, storyId, user.rows[0].id, parentId]
      )
    } else {
      collection = await DB.execute(
        `INSERT INTO collections (name, story_id, user_id) VALUES (?, ?, ?)`,
        [name, storyId, user.rows[0].id]
      )
    }

    const collectionId = collection.insertId

    return new Response(JSON.stringify({ message: "success", collectionId }), {
      status: 200,
    })
  }
  return new Response(null, { status: 401 })
}
