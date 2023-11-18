import { z } from "zod";
import { lock } from "proper-lockfile";
import { open, writeFile } from "fs/promises";
import { PlayerConfigEntrySchema } from "./playerConfigEntry.js";
import { RankSchema } from "./rank.js";
const stateFileName = "state.json";

export async function loadState(): Promise<[State, () => Promise<void>]> {
  try {
    const release = await lock(stateFileName);
    const stateFile = await open(stateFileName);
    const stateJson = (await stateFile.readFile()).toString();
    const state = StateSchema.parse(JSON.parse(stateJson));
    await stateFile.close();
    return [state, release];
  } catch (e) {
    console.log("unable to load state file");
    // default to empty state
    const state = {
      gamesStarted: [],
    };
    await writeState(state);
    const release = await lock(stateFileName);
    return [state, release];
  }
}

export async function writeState(state: State): Promise<void> {
  return await writeFile(stateFileName, JSON.stringify(state));
}

export type GameState = z.infer<typeof GameStateSchema>;
export const GameStateSchema = z.strictObject({
  // a way to uniquely identify this entry
  // generated by the application
  uuid: z.string(),
  // the time that this was added to the state
  added: z.string().pipe(z.coerce.date()),
  // the match id from the Riot API
  matchId: z.number(),
  player: PlayerConfigEntrySchema,
  rank: RankSchema,
});

export type State = z.infer<typeof StateSchema>;
export const StateSchema = z.strictObject({
  gamesStarted: z.array(GameStateSchema),
});