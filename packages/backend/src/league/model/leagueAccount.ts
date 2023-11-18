import { z } from "zod";

export type LeagueAccount = z.infer<typeof LeagueAcccountSchema>;
export const LeagueAcccountSchema = z.strictObject({
  // AKA encrypted summoner ID
  id: z.string().min(0),
  accountId: z.string().min(0),
  puuid: z.string().min(0),
});
