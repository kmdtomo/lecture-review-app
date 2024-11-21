import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../prisma/prisma";
import { User } from "@/app/type/type";

// カスタムセッションの型定義
declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }
  // JWTの型定義も拡張
  interface JWT {
    id: string;
  }
}

export const nextAuthOptions: NextAuthOptions = {
  debug: false,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],


  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user, }) {
      // console.log("Session user:", user);
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id, // user.id をセッションに追加
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // JWTトークンにユーザーIDを追加
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
