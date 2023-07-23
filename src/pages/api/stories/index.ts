import type { APIRoute } from "astro"
import { DB } from "../databaseConnection"
import { getSession } from "auth-astro/server"
import type { Story } from "../../../components/app/lib/types"

export const get: APIRoute = async ({ params, request }) => {
  let session = await getSession(request)
  if (session) {
    const results = await DB.execute(
      "SELECT s.id, s.name, s.last_edited FROM stories s join users u on u.id = s.user_id WHERE u.user_id = ?",
      [session.session.user.id]
    )
    let stories: Story[] = []
    for (let i = 0; i < results.rows.length; i++) {
      stories.push({
        id: results.rows[i].id,
        name: results.rows[i].name,
        lastEdited: results.rows[i].last_edited,
      })
    }

    return new Response(JSON.stringify(stories), {
      status: 200,
    })
  }
  return new Response(
    JSON.stringify({
      message: "No session found",
    }),
    { status: 401 }
  )
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
    const insert = await DB.execute(
      "INSERT INTO stories (name, last_edited, user_id) VALUES (?, ?, ?)",
      [name, lastEdited, user.rows[0].id]
    )

    return new Response(
      JSON.stringify({ id: insert.insertId, message: "success" }),
      {
        status: 200,
      }
    )
  }
  return new Response(
    JSON.stringify({
      message: "No session found",
    }),
    { status: 401 }
  )
}
