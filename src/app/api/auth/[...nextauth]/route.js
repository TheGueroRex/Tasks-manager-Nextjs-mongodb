import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/utils/mongoose";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "youremail@mail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials, req) {
        await connectDB();
        console.log(credentials);

        const userFound = await Users.findOne({
          email: credentials?.email,
        }).select("+password");
        if (!userFound) throw new Error("Usuario no encontrado");

        const passwordMatch = await bcrypt.compare(
          credentials?.password,
          userFound.password
        );
        if (!passwordMatch) throw new Error("Datos invalidos");

        console.log(userFound);
        return userFound;
      },
    }),
  ],

  callbacks: {
    jwt({ account, user, profile, session, token }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  }
});

export { handler as GET, handler as POST };
