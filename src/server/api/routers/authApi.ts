import { SignJWT } from "jose";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { createTRPCRouter, publicProcedure } from "../trpc";
import cookie from "cookie";
import bcrypt from "bcrypt";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string().min(4),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { res } = ctx;
      const { email, password } = input;

      //const isPasswordValid = bcrypt.compareSync(input.password, database.password);
      //if (!isPasswordValid) throw ("Invalid credentials");
      
      // check if user and password exists
      if (email === "email@brasao.com.br" && password === "123123") {
        console.log("authorized");
        //return jwt cookie
        const token = await new SignJWT({ email })
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("1h")
          .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));
        if (!res) throw new Error("no res");

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("user-token", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
          })
        );
        return { success: true };
      }

      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }),
});
