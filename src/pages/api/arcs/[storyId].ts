import type { APIRoute } from "astro"
import { DB } from "../databaseConnection"
import { getSession } from "auth-astro/server"

export const get: APIRoute = async ({ params, request }) => {
  let session = await getSession(request)
  if (session) {
    const { storyId } = params
    const results = await DB.execute(
      `SELECT 
        a.id,
        a.name
      FROM 
        arcs a 
        join users u on u.id = a.user_id
    WHERE 
        u.user_id = ? 
        AND a.story_id = ?
        `,
      [session.session.user.id, storyId]
    )
    let arcs = []
    for (let i = 0; i < results.rows.length; i++) {
      let newArc = {
        id: results.rows[i].id,
        name: results.rows[i].name,
      }
      arcs.push(newArc)
    }

    return new Response(JSON.stringify(arcs), {
      status: 200,
    })
  }
  return new Response(null, { status: 403 })
}
