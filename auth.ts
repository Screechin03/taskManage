import NextAuth, { CredentialsSignin } from "next-auth";

import credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import { User } from "./server/models/userModel";
import { compare } from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_KEY,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
    }),

    credentials({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide email & password");
        }

        await connectDB();

        const user = await User.findOne({ email }).select("+password +role");

        if (!user) {
          throw new CredentialsSignin("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Please provide password");
        }

        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) {
          throw new Error("Incorrect Password");
        }

        const userData = {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        };

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    //   signIn: async ({ user, account }) => {
    //     if (account?.provider === "google") {
    //       try {
    //         const { email, name, image, id } = user;

    //         await connectDB();

    //         const alreadyUser = await User.findOne({ email });

    //         if (!alreadyUser) {
    //           await User.create({ email, name, image, authProviderId: id });
    //         } else {
    //           return true;
    //         }
    //       } catch (error) {
    //         throw new Error("Error in creating user");
    //       }
    //     }

    //     if (account?.provider === "credentials") {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   },
  },
});
