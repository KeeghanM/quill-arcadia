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
        sa.arc_id as parent_id,
        a.name,
        ai.value as hook
      FROM 
        arcs a 
        join users u on u.id = a.user_id
        left join arc_information ai on ai.arc_id = a.id and ai.name = 'hook'
        left join arc_arcs sa on a.id = sa.sub_arc_id
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
        parentId: results.rows[i].parent_id || "",
        name: results.rows[i].name,
        information: { hook: results.rows[i].hook },
      }
      arcs.push(newArc)
    }

    return new Response(JSON.stringify(arcs), {
      status: 200,
    })
  }
  return new Response(null, { status: 401 })
}
