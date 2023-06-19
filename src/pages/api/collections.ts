import { connect } from "@planetscale/database"
import type { APIRoute } from "astro"

const config = {
  host: import.meta.env.DATABASE_HOST,
  username: import.meta.env.DATABASE_USERNAME,
  password: import.meta.env.DATABASE_PASSWORD,
}

export const get: APIRoute = async ({ params, request }) => {
  const conn = await connect(config)
  const results = await conn.execute("SELECT * FROM collections")
  return {
    body: JSON.stringify(results.rows),
  }
}
