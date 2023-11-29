// @deno-types="npm:@types/lodash"
import _ from "npm:lodash@4.17.21";
import { z } from "https://esm.sh/zod@3.22.4";
import { ChampionSchema } from "./champion.ts";
import { PlayerConfigEntrySchema } from "./playerConfigEntry.ts";
import { RosterSchema } from "./roster.ts";
import { TeamSchema } from "./team.ts";
import { LaneSchema } from "./lane.ts";

export type Match = z.infer<typeof MatchSchema>;
export const MatchSchema = z.strictObject({
  durationInSeconds: z.number().nonnegative(),
  // this field stores data specific to the player we care about
  player: z.strictObject({
    playerConfig: PlayerConfigEntrySchema,
    leaguePointsDelta: z.number(),
    tournamentWins: z.number().nonnegative(),
    tournamentLosses: z.number().nonnegative(),
    outcome: z.enum(["Victory", "Defeat", "Surrender"]),
    champion: ChampionSchema,
    team: TeamSchema,
    lane: LaneSchema.optional(),
    laneOpponent: ChampionSchema.optional(),
  }),
  teams: z.strictObject({
    red: RosterSchema,
    blue: RosterSchema,
  }),
});