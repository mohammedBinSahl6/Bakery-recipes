import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User as PrismaUser } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";

interface ExtendedUser extends PrismaUser {
  maxAge: number;
}

const MILLISECONDS_TO_SECONDS = 1000;
const THIRTY_DAYS = 30 * 24 * 60 * 60;
const ONE_DAY = 24 * 60 * 60;
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
  },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "sign in",

      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const prismaUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!prismaUser)
          throw new Error(
            "User not found. Please check your credentials and try again."
          );

        const passwordMatch = await compare(
          credentials.password,
          prismaUser.password
        );

        if (!passwordMatch)
          throw new Error(
            "Invalid password. Please check your credentials and try again."
          );

        const maxAge = THIRTY_DAYS;
        const sessionExpiry = new Date();
        sessionExpiry.setSeconds(sessionExpiry.getSeconds() + ONE_DAY);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userProfile } = prismaUser;

        return { ...userProfile, maxAge };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, session, trigger }) => {
      if (user) {
        return {
          ...token,
          user: user as ExtendedUser,
        };
      }
      const { maxAge } = token.user as ExtendedUser;
      const newToken = {
        ...token,
        exp: Math.floor(Date.now() / MILLISECONDS_TO_SECONDS) + maxAge,
      };

      if (trigger === "update") {
        return {
          ...newToken,
          ...session,
        };
      }

      return newToken;
    },
    session: async ({ token, session }) => {
      const { maxAge } = token.user as ExtendedUser;
      const updatedSession = {
        ...session,
        user: token.user,
        expires: new Date(
          Date.now() + maxAge * MILLISECONDS_TO_SECONDS
        ).toISOString(),
      };

      return updatedSession;
    },
  },
};
