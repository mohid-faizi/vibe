import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
  haveChat: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await inngest.send({
        name: "test/have.chat",
        data: input,
      });
      return response;
    }),
});

export type AppRouter = typeof appRouter;