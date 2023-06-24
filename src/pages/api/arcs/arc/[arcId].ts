import type { APIRoute } from "astro"
import { DB } from "../../databaseConnection"
import { getSession } from "auth-astro/server"
import type { ArcType } from "../../../../components/app/lib/types"

export const get: APIRoute = async ({ params, request }) => {
  let session = await getSession(request)
  if (session) {
    const { arcId } = params
    let arc: ArcType

    const arcResult = await DB.execute(
      `SELECT
            a.id,
            a.name
        FROM
            arcs a
            join users u on u.id = a.user_id
        WHERE
            u.user_id = ?
            AND a.id = ?
        `,
      [session.session.user.id, arcId]
    )
    if (arcResult.rows.length > 0) {
      arc = {
        id: arcResult.rows[0].id,
        name: arcResult.rows[0].name,
        information: {},
        collections: [],
        subArcs: [],
      }
    } else {
      return new Response(null, { status: 404 })
    }
    const informationResult = await DB.execute(
      `SELECT
            ai.name,
            ai.value
        FROM
            arc_information ai
        WHERE
            ai.arc_id = ?
        `,
      [arcId]
    )
    for (let i = 0; i < informationResult.rows.length; i++) {
      arc.information[informationResult.rows[i].name] =
        informationResult.rows[i].value
    }

    const collectionsResult = await DB.execute(
      `SELECT DISTINCT 
            c.id as collection_id, 
            c.name as collection_name
        FROM 
            arc_things at
            JOIN things t ON at.thing_id = t.id
            JOIN collections c ON t.collection_id = c.id
        WHERE 
            at.arc_id = ?`,
      [arcId]
    )
    for (let i = 0; i < collectionsResult.rows.length; i++) {
      arc.collections.push({
        id: collectionsResult.rows[i].collection_id,
        name: collectionsResult.rows[i].collection_name,
      })
    }

    return new Response(JSON.stringify(arc), {
      headers: { "content-type": "application/json" },
    })
  }
  return new Response(null, { status: 405 })
}
