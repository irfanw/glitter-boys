import _ from "lodash";
import { z } from "zod";
import { api } from "../api/api.js";
import { DiscordSchema } from "./discord.js";
import { parseDivision } from "./division.js";
import { LeagueAcccountSchema } from "./leagueAccount.js";
import { RankSchema, Rank } from "./rank.js";
import { TierSchema } from "./tier.js";
import { Constants } from "twisted";

export type PlayerConfigEntry = z.infer<typeof PlayerConfigEntrySchema>;
export const PlayerConfigEntrySchema = z.strictObject({
  name: z.string(),
  league: z.strictObject({
    leagueAccount: LeagueAcccountSchema,
    initialRank: RankSchema,
  }),
  discordAccount: DiscordSchema,
});

export async function getCurrentRank(player: PlayerConfigEntry): Promise<Rank> {
  const response = await api.League.bySummoner(player.league.leagueAccount.id, Constants.Regions.AMERICA_NORTH);
  const soloQueue = _.chain(response.response)
    .filter((entry) => entry.queueType === "RANKED_SOLO_5x5")
    .first()
    .value();
  if (!soloQueue) {
    throw new Error(`unable to find solo queue: ${JSON.stringify(response.response)}`);
  }
  const division = parseDivision(soloQueue.rank);
  if (division === undefined) {
    throw new Error(`unable to find division, ${JSON.stringify(soloQueue.rank)}`);
  }
  return {
    division,
    tier: TierSchema.parse(soloQueue.tier.toLowerCase()),
    lp: soloQueue.leaguePoints,
    wins: soloQueue.wins,
    losses: soloQueue.losses,
  };
}
