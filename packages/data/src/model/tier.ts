// @deno-types="npm:@types/lodash"
import _ from "npm:lodash@4.17.21";
import { z } from "https://esm.sh/zod@3.22.4";

export type Tier = z.infer<typeof TierSchema>;
export const TierSchema = z.enum([
  "iron",
  "bronze",
  "silver",
  "gold",
  "platinum",
  "emerald",
  "diamond",
  "master",
  "grandmaster",
  "challenger",
]);