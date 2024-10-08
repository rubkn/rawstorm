import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
//import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import {
  accounts,
  sessions,
  users,
  profiles,
  verificationTokens,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      const profile = await db
        .select()
        .from(profiles)
        .where(eq(profiles.userId, user.id))
        .limit(1);

      if (profile[0]?.username) {
        session.user.username = profile[0].username;
      } else {
        session.user.username = null;
      }

      return session;
    },
  },
});
