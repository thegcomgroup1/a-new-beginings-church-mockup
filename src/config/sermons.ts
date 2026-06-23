/** Latest-message data for the /watch page. The page embeds the YouTube
 *  channel directly when no specific videoId is set, so the page works
 *  the moment we wire in real YouTube video IDs. */

export const youtubeChannelUrl =
  "https://www.youtube.com/@AnewbeginningRushville";

export const youtubeChannelEmbed =
  // Channel home embed via uploads playlist tends to be brittle without an
  // ID; show a clean CTA card instead until we have specific video IDs.
  "";

export type SermonClip = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  youtubeId?: string; // missing = card links to the channel
  blurb?: string;
};

export const recentSermons: SermonClip[] = [
  {
    id: "sunday-latest",
    title: "This Sunday's Message",
    speaker: "Pastor Mark Mathews",
    date: "Latest",
    blurb:
      "Catch the most recent Sunday message on our YouTube channel. New uploads posted after each service.",
  },
];