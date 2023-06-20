import auth0 from "@auth/core/providers/auth0"

export default {
  providers: [
    auth0({
      clientId: import.meta.env.AUTH0_CLIENT_ID,
      clientSecret: import.meta.env.AUTH0_CLIENT_SECRET,
      issuer: import.meta.env.AUTH0_ISSUER,
    }),
  ],
}
