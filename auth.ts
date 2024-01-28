import { type GetServerSidePropsContext } from "next";
import { getServerSession, User, type NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { env } from "@/../env.mjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/drizzle";
import { Adapter, AdapterUser } from "next-auth/adapters";
import { encode, decode, DefaultJWT } from "next-auth/jwt";
import { Roles } from "@/server/db/types-schema";
import { makeAuthenticateFactory } from "@/server/factories/make-authenticate-factory";

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
    image: string | null;
    emailVerified: string;
    roleName: Roles["name"] | null;
    hasSendCertification: boolean | null;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: User | AdapterUser;
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

        const authenticateFactory = makeAuthenticateFactory();

        const user = await authenticateFactory.execute({
          email: credentials.email,
          password: credentials.password,
        });

        if (user && !user?.emailVerified) {
          throw new Error(`Email não verificado ${user.email}`);
        }

        if (user) {
          return user as unknown as User;
        }

        throw new Error("Email ou senha inválidos");
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update" && session.hasSendCertification) {
        token.user.hasSendCertification = session.hasSendCertification;
      }

      if (user) {
        return {
          ...token,
          user: {
            ...user,
          },
        };
      }

      return token;
    },

    session: async ({ session, token }) => {
      return {
        ...session,
        user: token.user,
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
