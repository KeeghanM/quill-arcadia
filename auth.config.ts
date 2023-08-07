import auth0 from "@auth/core/providers/auth0"
import { DB } from "./src/pages/api/databaseConnection"

export default {
  providers: [
    auth0({
      clientId: import.meta.env.AUTH0_CLIENT_ID,
      clientSecret: import.meta.env.AUTH0_CLIENT_SECRET,
      issuer: import.meta.env.AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    signIn: async (user) => {
      const pid = user.account.providerAccountId
      const p = user.account.provider

      const userInDatabase = await DB.execute(
        "SELECT * FROM users WHERE user_id = ? AND provider = ?",
        [pid, p]
      )
      if (userInDatabase.rows.length === 0) {
        await DB.execute(
          "INSERT INTO users (user_id, provider) VALUES (?, ?)",
          [pid, p]
        )
      }

      return Promise.resolve(true)
    },
    session: async (session) => {
      session.session.user.id = session.token.sub
      return Promise.resolve(session)
    },
  },
}
