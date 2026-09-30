import bibleStudyPlan from "@/assets/anewbeginning/big-picture-bible-reading-checklist.pdf.asset.json";

export type ResourceCategory =
  | "Prayer"
  | "Offering"
  | "Word of God"
  | "Evangelism"
  | "Relationships";

export type ResourceItem = {
  id: string;
  title: string;
  kind: "Sermon Notes" | "Study Guide" | "Reading" | "Devotional";
  description: string;
  fileUrl: string; // "#" means coming soon
  category: ResourceCategory;
  classResource?: boolean;
};

export const resourceCategories: Array<{
  name: ResourceCategory;
  letter: string;
  description: string;
}> = [
  { name: "Prayer", letter: "P", description: "Tools to strengthen a faithful, consistent prayer life." },
  { name: "Offering", letter: "O", description: "Biblical teaching on generosity, stewardship, and worship through giving." },
  { name: "Word of God", letter: "W", description: "Reading plans and study tools for growing in Scripture." },
  { name: "Evangelism", letter: "E", description: "Resources for sharing the hope of Jesus with others." },
  { name: "Relationships", letter: "R", description: "Biblical guidance for healthy families, friendships, and community." },
];

export const resources: ResourceItem[] = [
  {
    id: "sunday-sermon-notes",
    title: "Sunday Sermon Notes",
    kind: "Sermon Notes",
    description:
      "Follow along with notes from this Sunday's message — printable and easy to share.",
    fileUrl: "#",
    category: "Word of God",
  },
  {
    id: "new-believers-class-guide",
    title: "New Believers Class Guide",
    kind: "Study Guide",
    description:
      "Discussion questions and Scripture for the Tuesday New Believers Class — useful for class review or personal study.",
    fileUrl: "#",
    category: "Word of God",
    classResource: true,
  },
  {
    id: "gifts-of-the-spirit",
    title: "Gifts of the Spirit — 1 Corinthians 12",
    kind: "Study Guide",
    description:
      "A short study walking through the Gifts of the Spirit as Paul describes them in 1 Corinthians 12.",
    fileUrl: "#",
    category: "Word of God",
  },
  {
    id: "big-picture-bible-reading-checklist",
    title: "Big Picture Bible Reading Checklist & Study Worksheet",
    kind: "Study Guide",
    description:
      "A printable guide to 100 foundational Bible passages, plus a worksheet for reflecting on and applying each reading.",
    fileUrl: bibleStudyPlan.url,
    category: "Word of God",
    classResource: true,
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