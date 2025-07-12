import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

const handler = NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
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