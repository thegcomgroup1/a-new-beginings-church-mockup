export type ResourceItem = {
  id: string;
  title: string;
  kind: "Sermon Notes" | "Study Guide" | "Reading" | "Devotional";
  description: string;
  fileUrl: string; // "#" means coming soon
};

export const resources: ResourceItem[] = [
  {
    id: "sunday-sermon-notes",
    title: "Sunday Sermon Notes",
    kind: "Sermon Notes",
    description:
      "Follow along with notes from this Sunday's message — printable and easy to share.",
    fileUrl: "#",
  },
  {
    id: "midweek-bible-discussion",
    title: "Midweek Bible Discussion Guide",
    kind: "Study Guide",
    description:
      "Discussion questions and Scripture for the Tuesday Bible Discussion — good for personal study or a small group.",
    fileUrl: "#",
  },
  {
    id: "gifts-of-the-spirit",
    title: "Gifts of the Spirit — 1 Corinthians 12",
    kind: "Study Guide",
    description:
      "A short study walking through the Gifts of the Spirit as Paul describes them in 1 Corinthians 12.",
    fileUrl: "#",
  },
];

export type ReadingItem = {
  id: string;
  title: string;
  author: string;
  note: string;
};

export const recommendedReading: ReadingItem[] = [
  {
    id: "the-bible",
    title: "The Bible",
    author: "Start in the Gospel of John",
    note:
      "If you're new to all this, start in John. It's the clearest picture of who Jesus is and why He came.",
  },
];