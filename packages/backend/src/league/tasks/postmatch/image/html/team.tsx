import React from "react";
import { Team } from "../match.js";
import { renderChampion } from "./champion.js";
import _ from "lodash";
import { palette } from "../assets/colors.js";
import { font } from "../assets/fonts.js";

export function renderTeam(team: Team, side: "red" | "blue", highlight: string, durationInMinutes: number) {
  const teamKills = _.sumBy(team, (champion) => champion.kills);
  const teamDeaths = _.sumBy(team, (champion) => champion.deaths);
  const teamAssists = _.sumBy(team, (champion) => champion.assists);
  const teamGold = _.sumBy(team, (champion) => champion.gold);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
      <div style={{ display: "flex", gap: "6rem" }}>
        <span
          style={{
            color: side === "blue" ? palette.teams.blue : palette.teams.red,
            fontFamily: font.title,
            fontWeight: 700,
          }}
        >
          TEAM {side === "blue" ? 1 : 2}
        </span>
        <span style={{ fontWeight: 700 }}>
          {teamKills} / {teamDeaths} / {teamAssists} KDA
        </span>
        <span style={{ fontWeight: 700 }}>{teamGold.toLocaleString()} gold</span>
      </div>
      {_.map(team, (champion) => renderChampion(champion, champion.champion === highlight, durationInMinutes))}
    </div>
  );
}