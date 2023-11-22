import dotenv from "dotenv";
import env from "env-var";

dotenv.config();

export default {
  discordToken: env.get("DISCORD_TOKEN").required().asString(),
  applicationId: env.get("APPLICATION_ID").required().asString(),
  guildId: env.get("GUILD_ID").required().asString(),
  dataDir: env.get("DATA_DIR").required().asString(),
  riotApiToken: env.get("RIOT_API_TOKEN").required().asString(),
  leagueChannelId: env.get("LEAGUE_CHANNEL_ID").required().asString(),
  openAiAPiKey: env.get("OPENAI_API_KEY").required().asString(),
  s3BucketName: env.get("S3_BUCKET_NAME").required().asString(),
};
