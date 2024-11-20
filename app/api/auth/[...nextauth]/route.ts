import { nextAuthOptions } from "@/app/lib/next-auth/option";
import NextAuth from "next-auth";

//ユーザー情報保持
const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
