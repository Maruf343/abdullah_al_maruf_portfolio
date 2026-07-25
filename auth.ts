import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim() || "";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync("293439almaruf@", 10);

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || "dev-secret",
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = String(credentials.email).trim().toLowerCase();
        const password = String(credentials.password);
        const normalizedAdminEmail = ADMIN_EMAIL.toLowerCase();

        if (normalizedAdminEmail && email === normalizedAdminEmail) {
          const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
          if (!isValidPassword) return null;

          return {
            id: "admin",
            name: "Admin",
            email: ADMIN_EMAIL,
            role: "admin",
          };
        }

        const client = await prisma.client.findUnique({ where: { email } });
        if (!client) return null;

        const isValidPassword = await bcrypt.compare(password, client.passwordHash);
        if (!isValidPassword) return null;

        return {
          id: String(client.id),
          name: client.name,
          email: client.email,
          role: "client",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (account?.provider === "credentials" && token.role === "client" && token.id) {
        await prisma.client.update({
          where: { id: Number(token.id) },
          data: { lastLoginAt: new Date() },
        }).catch(() => undefined);
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "admin" | "client";
      }
      return session;
    },
  },
});
