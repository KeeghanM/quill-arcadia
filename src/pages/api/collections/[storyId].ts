import type { APIRoute } from "astro"
import { DB } from "../databaseConnection"
import { getSession } from "auth-astro/server"

export const get: APIRoute = async ({ params, request }) => {
  let session = await getSession(request)
  if (session) {
    const { storyId } = params
    const results = await DB.execute(
      `SELECT 
        c.id,
        c.name 
      FROM 
        collections c 
        join users u on u.id = c.user_id 
      WHERE 
        u.user_id = ? 
        AND c.story_id = ?`,
      [session.session.user.id, storyId]
    )
    let collections = []
    for (let i = 0; i < results.rows.length; i++) {
      collections.push({
        id: results.rows[i].id,
        name: results.rows[i].name,
      })
    }

    return new Response(JSON.stringify(collections), {
      status: 200,
    })
  }
  return new Response(null, { status: 403 })
}
