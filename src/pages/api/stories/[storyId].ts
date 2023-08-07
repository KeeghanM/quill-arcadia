import type { APIRoute } from "astro"
import { DB } from "../databaseConnection"
import { getSession } from "auth-astro/server"
import type { Story } from "../../../components/app/lib/types"

export const get: APIRoute = async ({ params, request }) => {
  let session = await getSession(request)
  if (session) {
    const { storyId } = params
    if (!storyId) {
      return new Response(JSON.stringify({ message: "No storyId provided" }), {
        status: 400,
      })
    }

    const results = await DB.execute(
      "SELECT * FROM stories s join users u on u.id = s.user_id WHERE u.user_id = ? AND s.id = ?",
      [session.session.user.id, storyId]
    )
    const story: Story = {
      id: results.rows[0].id,
      name: results.rows[0].name,
      lastEdited: results.rows[0].last_edited,
    }

    return new Response(JSON.stringify(story), {
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

export const put: APIRoute = async ({ params, request }) => {
  let session = await getSession(request)

  if (session) {
    const { storyId } = params
    if (!storyId) {
      return new Response(JSON.stringify({ message: "No storyId provided" }), {
        status: 400,
      })
    }

    const { name, lastEdited } = await request.json()
    if (!name) {
      return new Response(JSON.stringify({ message: "No name provided" }), {
        status: 400,
      })
    }
    if (!lastEdited) {
      return new Response(
        JSON.stringify({ message: "No lastEdited provided" }),
        {
          status: 400,
        }
      )
    }

    const user = await DB.execute("SELECT id FROM users WHERE user_id = ?", [
      session.session.user.id,
    ])
    if (user.rows.length === 0) {
      throw new Error(`No user found with user_id ${session.session.user.id}`)
    }
    await DB.execute(
      "UPDATE stories SET name = ?, last_edited = ? WHERE id = ? AND user_id = ?",
      [name, lastEdited, storyId, user.rows[0].id]
    )

    return new Response(JSON.stringify({ message: "success" }), {
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

export const del: APIRoute = async ({ params, request }) => {
  let session = await getSession(request)

  if (session) {
    const { storyId } = params

    if (!storyId) {
      return new Response(JSON.stringify({ message: "No storyId provided" }), {
        status: 400,
      })
    }

    const user = await DB.execute("SELECT id FROM users WHERE user_id = ?", [
      session.session.user.id,
    ])
    if (user.rows.length === 0) {
      throw new Error(`No user found with user_id ${session.session.user.id}`)
    }
    await DB.execute("DELETE FROM stories WHERE id = ? AND user_id = ?", [
      storyId,
      user.rows[0].id,
    ])

    return new Response(JSON.stringify({ message: "success" }), {
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
