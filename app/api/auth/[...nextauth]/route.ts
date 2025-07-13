import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}

const handler = NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Zapisz access token w JWT
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Przekaż access token do sesji
      session.accessToken = token.accessToken
      return session
    },
    async redirect({ url, baseUrl }) {
      // Po zalogowaniu przekieruj na dashboard
      if (url.startsWith(baseUrl)) return `${baseUrl}/dashboard`
      // Pozwól na zewnętrzne URL (Azure)
      else if (url.startsWith("http")) return url
      return baseUrl
    },
  },

})

export { handler as GET, handler as POST }