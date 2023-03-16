import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const importRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.import.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: publicProcedure
    .input(
      z.object({
        take: z.number().min(1).max(100).nullish(),
        skip: z.number().max(100).nullish(),
      })
    )
    .query(({ ctx }) => {
      return ctx.prisma.import.findMany();
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        data: z.array(z.any()),
        columns: z.array(z.string()),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.import.create({
        data: {
          name: input.name,
          type: "csv",
          status: "pending",
          data: input.data,
          columns: input.columns,
        },
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        data: z.array(
          z.object({
            name: z.string(),
          })
        ),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.import.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          data: input.data,
        },
      });
    }),
});
