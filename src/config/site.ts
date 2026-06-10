/**
 * A New Beginning Church — Rushville, IN — site configuration (the swap layer).
 *
 * Sourced from their Facebook page. Spirit-led / charismatic Christian church.
 *
 * TODOs before going live:
 *  - Upload real logo PNG to src/assets/anewbeginning/logo.png and set brand.logoImageSrc.
 *  - Confirm pastor name (placeholder used in sermon block).
 *  - Confirm giving platform/URL.
 *  - Confirm "Church" vs "Ministry" wording with Mark.
 */

import logo from "@/assets/anewbeginning/logo.png.asset.json";
import servicePhoto from "@/assets/anewbeginning/service.jpg.asset.json";
import churchHero from "@/assets/anewbeginning/church-hero.jpg.asset.json";
import sunsetPhoto from "@/assets/anewbeginning/sunset.jpg.asset.json";
import churchFront from "@/assets/anewbeginning/church-front.jpg.asset.json";
import bandWorship from "@/assets/anewbeginning/band-worship.jpg.asset.json";
import churchSign from "@/assets/anewbeginning/church-sign.jpg.asset.json";
import jesusWagon from "@/assets/anewbeginning/jesus-wagon.jpg.asset.json";

export const siteConfig = {
  announcement: {
    enabled: false, // flip true for a top banner (e.g., a special service)
    text: "Join us this Sunday at 10:30 — there's a seat saved for you.",
    ctaLabel: "Plan your visit",
    ctaUrl: "#visit",
  },

  church: {
    name: "A New Beginning Church",
    shortName: "A New Beginning",
    city: "Rushville, IN",
    tagline: "Come as you are. Begin again.",
    mission:
      "A Spirit-led family of believers in Rushville, Indiana — anchored in God's Word, alive in the Gifts of the Spirit, and making room for anyone ready for a fresh start.",
    story: [
      "We're a Spirit-led church in Rushville — led by the Holy Spirit, grounded in the Holy Scriptures, and walking in the Gifts of the Spirit just as Paul described them in 1 Corinthians 12. We believe God still moves today, and we make room for Him to.",
      "We're small enough that you won't slip through the cracks. When you walk in, you'll be welcomed, known, and prayed for by name. Whatever season you're in, there's room for a new beginning here. Join us Sundays at 10:30.",
    ],
    foundedLine: "A church for Rushville",
  },

  brand: {
    logoText: "A New Beginning",
    logoImageSrc: logo.url,
    storyImageSrc: servicePhoto.url,
    storyImageAlt: "A pastor preaching during a Sunday service at A New Beginning Church",

    heroMedia: {
      type: "image" as "image" | "video",
      imageSrc: churchHero.url,
      imageAlt: "A New Beginning Church in Rushville, Indiana on a bright Sunday afternoon",
      videoSrc: "",
    },
  },

  service: {
    timesShort: "Sundays · 10:30 AM",
    timesLong: [
      { day: "Sunday", time: "10:30 AM" },
    ],
    address: "1024 S Old 3, Rushville, IN 46173",
    mapEmbedUrl:
      "https://www.google.com/maps?q=1024+S+Old+3,+Rushville,+IN+46173&output=embed",
    mapLinkUrl: "https://www.google.com/maps?q=1024+S+Old+3,+Rushville,+IN+46173",
    practical: [
      { label: "Where", value: "1024 S Old 3, Rushville — easy to find, easy to park" },
      { label: "Come expectant", value: "Our services are Spirit-led — come ready to meet with God" },
      { label: "What to wear", value: "Come exactly as you are" },
    ],
  },

  expect: [
    {
      icon: "Heart" as const,
      title: "You'll be welcomed like family",
      body: "No crowd to get lost in. You'll be greeted, known, and prayed for by name — and genuinely glad you came.",
    },
    {
      icon: "BookOpen" as const,
      title: "Rooted in God's Word",
      body: "We don't change the Scriptures — we let them change us. Expect a message straight from the Bible that meets your real life.",
    },
    {
      icon: "Users" as const,
      title: "Walking in the Spirit, together",
      body: "Led by the Holy Spirit and alive in the Gifts of the Spirit (1 Corinthians 12). Come expecting God to move.",
    },
    {
      icon: "Shirt" as const,
      title: "Come exactly as you are",
      body: "No dress code, no pretense, no perfect résumé required. Just come — a new beginning starts with one step in the door.",
    },
  ],

  life: [
    { src: churchFront.url, alt: "Front view of A New Beginning Church in Rushville" },
    { src: bandWorship.url, alt: "Worship team — keyboard, guitar and bass — leading praise on stage beneath the wooden cross" },
    { src: servicePhoto.url, alt: "A pastor preaching during a Sunday service at A New Beginning Church" },
    { src: churchSign.url, alt: "A New Beginning church marquee: 'Salvation is free… bath included. Sun 10:30, Tue Thur 6'" },
    { src: jesusWagon.url, alt: "'Chugging Along for Jesus' decorated parade wagon outside the church" },
    { src: churchHero.url, alt: "Exterior side view of A New Beginning Church beneath a blue sky" },
    { src: sunsetPhoto.url, alt: "Sunset over open fields at dusk" },
  ],

  ministries: [
    { name: "Plan Your First Visit", line: "New here? This is your ramp. We'll tell you exactly what to expect and make your first Sunday easy." },
    { name: "Rooted in the Word", line: "Bible-centered teaching for believers and seekers alike. Wherever you're starting from, you can grow here." },
    { name: "Room for the Spirit", line: "We make space for the Holy Spirit to move — in worship, in prayer, and in the Gifts He gives His people." },
    { name: "A Place to Begin Again", line: "However you arrive, there's room for a fresh start. Come as you are and take the next step with us." },
  ],

  events: [
    {
      date: "This Sunday · 10:30 AM",
      title: "Join Us This Sunday",
      blurb: "Come a few minutes early — we'll be watching for you and help you get settled.",
    },
    {
      date: "Every week",
      title: "New Here? Plan a Visit",
      blurb: "Let us know you're coming and we'll have someone ready to welcome you by name.",
    },
  ],

  sermon: {
    title: "Latest Message",
    speaker: "Pastor Mark Matthews",
    series: "A New Beginning Church",
    date: "On Facebook",
    summary:
      "Spirit-led and straight from the Word. Catch the latest message on Facebook, or join us in person this Sunday.",
    embedUrl: "",
    watchUrl: "https://www.facebook.com/p/A-New-Beginning-Ministry-61551913997354/",
  },

  give: {
    line: "Every gift helps A New Beginning serve Rushville and reach more people with the hope of the gospel.",
    onlineUrl: "#",
  },

  welcomeVideo: {
    enabled: false,
    eyebrow: "Meet us first",
    heading: "A quick hello before you visit.",
    body:
      "Visiting a new church can feel like a big step. Here's a short hello so you know exactly who you'll be meeting on Sunday.",
    posterSrc: servicePhoto.url,
    embedUrl: "",
  },

  contact: {
    phone: "(765) 389-8013",
    email: "anewbeginningrushville@gmail.com",
    socials: [
      { label: "Facebook", url: "https://www.facebook.com/p/A-New-Beginning-Ministry-61551913997354/" },
      { label: "YouTube", url: "#" },
      { label: "Instagram", url: "#" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
