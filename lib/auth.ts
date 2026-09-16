import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { getEmployees } from "@/app/action/get-employee";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const users = (await getEmployees()).filter((u) => u.status);
          const dbUser = users.find((u) => u.mail === profile.email);

          token.role = dbUser?.role;
          token.email = dbUser?.mail;
        } catch (e) {
          token.role = "";
          token.email = "";
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
