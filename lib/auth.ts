import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/drizzle/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/drizzle/schema";

declare module "next-auth" {
  interface User {
    username?: string | null;
  }

  interface Session {
    user: {
      username?: string | null;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  pages: {
    signIn: "/signup",
  },
});
