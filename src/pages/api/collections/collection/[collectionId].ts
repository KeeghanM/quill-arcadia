import type { APIRoute } from "astro"
import { DB } from "../../databaseConnection"
import { getSession } from "auth-astro/server"
import type { CollectionType } from "../../../../components/app/lib/types"

export const get: APIRoute = async ({ params, request }) => {
  const session = await getSession(request)
  if (session) {
    const { collectionId } = params
    let collection: CollectionType

    const collectionResult = await DB.execute(
      `SELECT
                c.id
                , c.name
                , c.parent_collection_id
            FROM
                collections c
                JOIN users u ON u.id = c.user_id
            WHERE
                u.user_id = ?
                AND c.id = ?
            `,
      [session.session.user.id, collectionId]
    )
    if (collectionResult.rows.length == 0) {
      return new Response(null, { status: 404 })
    }

    collection = {
      id: collectionResult.rows[0].id,
      name: collectionResult.rows[0].name,
      things: [],
      subCollections: [],
      parentId: collectionResult.rows[0].parent_collection_id,
    }

    const thingsResult = await DB.execute(
      `SELECT
                t.id
                , t.name
            FROM
                things t
                JOIN collections c ON t.collection_id = c.id
            WHERE
                c.id = ?
            `,
      [collectionId]
    )
    for (let i = 0; i < thingsResult.rows.length; i++) {
      const thingInformation = await DB.execute(
        `SELECT
                    ti.name
                    , ti.value
                FROM
                    thing_information ti
                WHERE
                    ti.thing_id = ?
                `,
        [thingsResult.rows[i].id]
      )
      const thingInformationObject = {}
      for (let j = 0; j < thingInformation.rows.length; j++) {
        thingInformationObject[thingInformation.rows[j].name] =
          thingInformation.rows[j].value
      }
      collection.things.push({
        id: thingsResult.rows[i].id,
        name: thingsResult.rows[i].name,
        information: thingInformationObject,
      })
    }
    const subCollectionsResult = await DB.execute(
      `SELECT
                c.id
                , c.name
            FROM
                collections c
            WHERE
                c.parent_collection_id = ?
            `,
      [collectionId]
    )
    for (let i = 0; i < subCollectionsResult.rows.length; i++) {
      collection.subCollections.push({
        id: subCollectionsResult.rows[i].id,
        name: subCollectionsResult.rows[i].name,
        things: [],
      })
    }
    return new Response(JSON.stringify(collection), {
      headers: { "content-type": "application/json" },
    })
  }
  return new Response(null, { status: 401 })
}
