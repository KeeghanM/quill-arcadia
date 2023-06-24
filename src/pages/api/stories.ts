import type { APIRoute } from "astro"
import { DB } from "./databaseConnection"
import { getSession } from "auth-astro/server"

export const get: APIRoute = async ({ params, request }) => {
  let session = await getSession(request)
  if (session) {
    const results = await DB.execute(
      "SELECT * FROM stories s join users u on u.id = s.user_ID WHERE u.user_id = ?",
      [session.session.user.id]
    )
    return new Response(JSON.stringify(results.rows), {
      status: 200,
    })
  }
  return new Response(null, { status: 403 })
}

export const post: APIRoute = async ({ params, request }) => {
  let session = await getSession(request)

  if (session) {
    const { name, lastEdited } = await request.json()

    const user = await DB.execute("SELECT id FROM users WHERE user_id = ?", [
      session.session.user.id,
    ])
    if (user.rows.length === 0) {
      throw new Error(`No user found with user_id ${session.session.user.id}`)
    }
    await DB.execute(
      "INSERT INTO stories (name, last_edited, user_ID) VALUES (?, ?, ?)",
      [name, lastEdited, user.rows[0].id]
    )

    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
    })
  }
  return new Response(null, { status: 403 })
}
