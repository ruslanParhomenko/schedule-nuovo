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
    async session({ session }) {
      const employees = (await getEmployees()) as {
        id: string;
        name: string;
        role: string;
        mail: string;
      }[];
      if (session.user) {
        session.user.role = employees.find(
          (emp) => emp.mail === session.user.email,
        )?.role;
      }
      return session;
    },
  },
};
