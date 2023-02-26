import { z } from "zod";
import { env } from "../../../env.mjs";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bpmRouter = createTRPCRouter({
  createLicense: publicProcedure
    .input(
      z.object({
        company: z.object({
          name: z.string(),
          cnpj: z.string(),
        }),
        user: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        area: z.object({
          name: z.string(),
          description: z.string(),
        }),
        license: z.object({
          isActive: z.boolean(),
          planName: z.string(),
          userLimit: z.number(),
          areaLimit: z.number(),
          pricePerUser: z.number(),
        }),
      })
    )
    .mutation(({ input }) => {
      fetch(`${env.BPM_API_URL}/licenses/companies`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          "api_key": "SENHA",
        },
      })
        .then((res) => {
          console.log('res', res);
          return res.json();
        })
        .catch((err: any) => {
          return console.error(err);
        });
    }),
});

