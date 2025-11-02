export type Event = {
  title: string;
  image: string; // path under /public
  slug: string;
  location: string;
  date: string; // human-readable date (e.g., "Dec 1, 2025")
  time: string; // human-readable time with TZ (e.g., "9:00 AM PST")
};

// Curated list of real or widely-known developer events and hackathons
// Image paths reference files in /public/images
export const events: Event[] = [
  {
    title: "AWS re:Invent 2025",
    image: "/images/event1.png",
    slug: "aws-reinvent-2025",
    location: "Las Vegas, NV, USA",
    date: "Dec 1–5, 2025",
    time: "8:30 AM–6:00 PM PST",
  },
  {
    title: "KubeCon + CloudNativeCon Europe 2026",
    image: "/images/event2.png",
    slug: "kubecon-eu-2026",
    location: "Vienna, Austria",
    date: "Mar 17–20, 2026",
    time: "9:00 AM–5:30 PM CET",
  },
  {
    title: "Google I/O 2026",
    image: "/images/event3.png",
    slug: "google-io-2026",
    location: "Mountain View, CA, USA (Shoreline Amphitheatre) / Online",
    date: "May 2026 (TBA)",
    time: "Keynote 10:00 AM PT (TBA)",
  },
  {
    title: "Microsoft Build 2026",
    image: "/images/event4.png",
    slug: "microsoft-build-2026",
    location: "Seattle, WA, USA / Online",
    date: "May 2026 (TBA)",
    time: "9:00 AM–5:00 PM PT",
  },
  {
    title: "WWDC 2026",
    image: "/images/event5.png",
    slug: "apple-wwdc-2026",
    location: "Cupertino, CA, USA / Online",
    date: "June 2026 (TBA)",
    time: "Keynote 10:00 AM PT",
  },
  {
    title: "DEF CON 34",
    image: "/images/event6.png",
    slug: "defcon-34-2026",
    location: "Las Vegas, NV, USA",
    date: "Aug 6–9, 2026",
    time: "10:00 AM–7:00 PM PT",
  },
  {
    title: "ETHGlobal Hackathon (Tokyo 2026)",
    image: "/images/event3.png",
    slug: "ethglobal-tokyo-2026",
    location: "Tokyo, Japan",
    date: "Apr 10–12, 2026",
    time: "24-hour build sprint (JST)",
  },
  {
    title: "JSConf EU 2026",
    image: "/images/event2.png",
    slug: "jsconf-eu-2026",
    location: "Berlin, Germany",
    date: "Sep 2026 (TBA)",
    time: "9:00 AM–6:00 PM CEST",
  },
  {
    title: "React Summit 2026",
    image: "/images/event4.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands / Online",
    date: "Jun 2026 (TBA)",
    time: "9:00 AM–6:00 PM CEST",
  },
  {
    title: "PyCon US 2026",
    image: "/images/event1.png",
    slug: "pycon-us-2026",
    location: "Salt Lake City, UT, USA",
    date: "Apr 2026 (TBA)",
    time: "9:00 AM–5:30 PM MT",
  },
];
