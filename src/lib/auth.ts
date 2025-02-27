import type {AuthOptions, Session} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {NextSession} from "@/lib/types/Session";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      (session as NextSession).user.id = token.sub || '';
      return session;
    },
  },
};

export default authOptions;