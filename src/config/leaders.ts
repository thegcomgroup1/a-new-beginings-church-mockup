import leaderMark from "@/assets/anewbeginning/leader-mark.jpg.asset.json";
import leaderTammy from "@/assets/anewbeginning/leader-tammy.jpg.asset.json";
import leaderAnswan from "@/assets/anewbeginning/leader-answan.jpg.asset.json";
import leaderLori from "@/assets/anewbeginning/leader-lori.jpg.asset.json";

export type Leader = {
  id: string;
  name: string;
  role: string;
  blurb: string;
  imageSrc?: string;
  imageAlt?: string;
};

export const leaders: Leader[] = [
  {
    id: "mark-mathews",
    name: "Mark Mathews",
    role: "Lead Pastor",
    blurb:
      "Mark didn't follow a typical path to become a pastor. After many years of trying to live his life on his own terms, God called him to become a man of God and lead many to accept and live as Jesus, our Savior, taught us to live.",
    imageSrc: leaderMark.url,
    imageAlt: "Pastor Mark Mathews preaching at A New Beginning Church",
  },
  {
    id: "tammy-mathews",
    name: "Tammy Mathews",
    role: "Lead Women's Pastor · Vice President, Board of Trustees",
    blurb:
      "Tammy and Mark chose to leave the comforts of a good job and a comfortable life to return home and help lead this church. She shepherds the women of A New Beginning with warmth and conviction.",
    imageSrc: leaderTammy.url,
    imageAlt: "Tammy Mathews leading at A New Beginning Church",
  },
  {
    id: "answan",
    name: "Answan",
    role: "Deacon · Board of Trustees",
    blurb:
      "Answan has played many roles in the church over the years — but being a trusted friend, leader, and mentor is what defines the character of a man we all love.",
    imageSrc: leaderAnswan.url,
    imageAlt: "Answan serving at A New Beginning Church",
  },
  {
    id: "lori-denzler",
    name: "Lori Denzler",
    role: "Worship Leader · Board of Trustees",
    blurb:
      "Lori is a dedicated worship leader and a faithful member of the Board of Trustees. She helps create the space where our church meets with God on Sundays.",
    imageSrc: leaderLori.url,
    imageAlt: "Lori Denzler at A New Beginning Church",
  },
  {
    id: "susan-vantrees",
    name: "Susan Vantrees",
    role: "Clerk · Board of Trustees",
    blurb:
      "Susan has been a faithful member of the church for years and serves as our clerk, quietly keeping the work of the ministry moving along behind the scenes.",
  },
];