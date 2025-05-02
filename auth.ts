import NextAuth, { type User } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./database/drizzle";
import { usersTable } from "./database/schema";
import { eq } from "drizzle-orm";
import { PUBLIC_PAGES } from "./constants";
import config from "./lib/config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: config.env.sessionMaxAge,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const user = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, credentials.email.toString()))
          .limit(1);

        if (user.length === 0) {
          throw new Error("User with this email has not registered");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password.toString(),
          user[0].password
        );

        if (!isPasswordValid) throw new Error("Password is incorrect");

        return {
          id: user[0].id,
          email: user[0].email,
          name: user[0].fullName,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: PUBLIC_PAGES.signIn,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
      }
      return session;
    },
  },
});
