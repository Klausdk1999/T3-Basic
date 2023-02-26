import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from 'bcrypt';

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(4),
});

export const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string().min(4),
      })
    )
    .mutation(({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: bcrypt.hashSync(input.password, 10),
        },
      });
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: { id: input.id },
      });
    }),
  updateById: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        email: z.string().email(),
        name: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          email: input.email,
          name: input.name,
        },
      });
    }),
  deleteById: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.delete({ where: { id: input.id } });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return ctx.prisma.user.findMany();
  }),
});
