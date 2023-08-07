import type { APIRoute } from "astro"
import { DB } from "../databaseConnection"
import { getSession } from "auth-astro/server"

export const post: APIRoute = async ({ params, request }) => {
  let session = await getSession(request)
  if (session) {
    const { name, storyId, information } = await request.json()

    const user = await DB.execute("SELECT id FROM users WHERE user_id = ?", [
      session.session.user.id,
    ])
    if (user.rows.length === 0) {
      throw new Error(`No user found with user_id ${session.session.user.id}`)
    }
    const arc = await DB.execute(
      `INSERT INTO arcs (name, story_id, user_id) VALUES (?, ?, ?)`,
      [name, storyId, user.rows[0].id]
    )

    const arcId = arc.insertId

    Object.entries(information).forEach(async ([key, value]) => {
      await DB.execute(
        `INSERT INTO arc_information (arc_id, name, value) VALUES (?, ?, ?)`,
        [arcId, String(key), String(value)]
      )
    })

    return new Response(JSON.stringify({ message: "success", arcId }), {
      status: 200,
    })
  }
  return new Response(null, { status: 401 })
}
