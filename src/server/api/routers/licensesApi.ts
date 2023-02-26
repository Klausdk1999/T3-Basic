import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const licensesRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        isActive: z.boolean(),
        planName: z.string(),
        adminEmail: z.string().email(),
        userLimit: z.number(),
        areaLimit: z.number(),
        pricePerUser: z.number(),
        company_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.license.create({
        data: {
          id: input.id,
          isActive: input.isActive,
          planName: input.planName,
          adminEmail: input.adminEmail,
          userLimit: input.userLimit,
          areaLimit: input.areaLimit,
          pricePerUser: input.pricePerUser,
          company_id: input.company_id,
        },
      });
    }),
  updateById: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        isActive: z.boolean(),
        adminEmail: z.string().email(),
        planName: z.string(),
        userLimit: z.number(),
        areaLimit: z.number(),
        pricePerUser: z.number(),
        company_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.license.update({
        where: { id: input.id },
        data: {
          isActive: input.isActive,
          adminEmail: input.adminEmail,
          planName: input.planName,
          userLimit: input.userLimit,
          areaLimit: input.areaLimit,
          pricePerUser: input.pricePerUser,
          company_id: input.company_id,
        },
      });
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.license.findFirst({ where: { id: input.id } });
    }),
  deleteById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.license.delete({ where: { id: input.id } });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return ctx.prisma.license.findMany();
  }),
});
