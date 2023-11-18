import { CronJob } from "cron";
import { postLeaderboardMessage } from "./leaderboard.js";
import { checkPostMatch } from "./postmatch.js";
import { checkPreMatch } from "./prematch.js";

// post leaderboard update once a day mon-fri at noon
new CronJob("0 0 12 * * 1-5", logErrors(postLeaderboardMessage), undefined, true, "America/Los_Angeles");
// check spectate status every minute
new CronJob("0 * * * * *", logErrors(checkPreMatch), undefined, true, "America/Los_Angeles", {}, true);
// check match status every minute, offset by 30 seconds
// this helps with rate limiting and file locking, although it should be safe to run both at the same time
new CronJob("30 * * * * *", logErrors(checkPostMatch), undefined, true, "America/Los_Angeles", {}, true);

function logErrors(fn: () => unknown) {
  return () => {
    try {
      fn();
    } catch (e) {
      console.error(e);
    }
  };
}
