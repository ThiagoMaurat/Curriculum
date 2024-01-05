import { type GetServerSidePropsContext } from "next";
import { getServerSession, User, type NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { env } from "@/../env.mjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/drizzle";
import { Adapter } from "next-auth/adapters";
import { encode, decode, JWT } from "next-auth/jwt";
import { Roles } from "@/db/types-schema";
import { makeAuthenticateFactory } from "@/server/factories/make-authenticate-use-case";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    phone: string;
    roleName: Roles["name"];
  }

  interface Session {
    user: {
      name: string;
      email: string;
      picture: string | null;
      sub: string;
      id: string;
      emailVerified: string | null;
      image: string | null;
      phone: string;
      cpf: string;
      birthdate: string;
      roleName: Roles["name"];
      iat: number;
      exp: number;
      jti: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    email: string;
    picture: string | null;
    sub: string;
    id: string;
    emailVerified: string | null;
    phone: string;
    roleName: string;
    iat: number;
    exp: number;
    jti: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: { encode, decode },
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const { execute } = makeAuthenticateFactory();

          const user = await execute({
            email: credentials.email,
            password: credentials.password,
          });

          if (!user) {
            return null;
          }

          return user as unknown as User;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update" && session) {
        token.emailVerified = new Date().toISOString();
      }

      return {
        ...token,
        ...user,
      } as JWT;
    },

    session: async ({ session, token }) => {
      return {
        ...session,
        user: token,
      };
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
