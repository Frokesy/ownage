export type BlogSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type BlogPost = {
  id: number;
  slug: string;
  img: string;
  title: string;
  category: "User Stories" | "Updates" | "Feature Spotlights" | "Tips";
  excerpt: string;
  author: string;
  publishedAt: string;
  displayDate: string;
  content: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    id: 1, slug: "things-to-consider-before-investing-in-real-estate", img: "/blog-img-1.png", category: "Tips",
    title: "5 Things to Consider Before Investing in Real Estate", excerpt: "Learn the essential checks every buyer should make before committing to a property investment.",
    author: "Adam Olabode", publishedAt: "2025-07-06", displayDate: "06 Jul, 2025",
    content: [
      { heading: "Start with a clear investment goal", paragraphs: ["A good property decision begins with knowing what you want the asset to do for you. Rental income, long-term appreciation, and building a future home each require a different approach.", "Your goal will guide the location, property type, budget, and timeline that make sense for you."], points: ["Define your expected holding period", "Decide whether income or appreciation matters most", "Keep a reserve for documentation and development costs"] },
      { heading: "Verify before you commit", paragraphs: ["Review the title, survey, planning status, and seller's authority before making payment. A promising price cannot make up for unclear ownership.", "Work with qualified property and legal professionals, visit the location yourself, and document every agreement in writing."] },
    ],
  },
  {
    id: 2, slug: "why-location-determines-property-value", img: "/blog-img-2.png", category: "Feature Spotlights",
    title: "Why Location Still Determines Property Value", excerpt: "See how infrastructure, access, and neighbourhood growth influence a property's long-term value.",
    author: "Adam Olabode", publishedAt: "2025-07-06", displayDate: "06 Jul, 2025",
    content: [
      { heading: "Value grows around access", paragraphs: ["People pay for convenience. Reliable roads, employment centres, schools, healthcare, and everyday services make an area easier to live in and more attractive to future buyers.", "A location does not need to be fully developed today, but there should be credible signs of sustainable demand."], points: ["Current and planned road connections", "Proximity to jobs and essential services", "Evidence of consistent residential demand"] },
      { heading: "Look beyond the present", paragraphs: ["Infrastructure plans and new commercial activity can change a neighbourhood's prospects. Research what is approved, what is funded, and what is only speculation.", "The strongest decisions balance future potential with what already works on the ground."] },
    ],
  },
  {
    id: 3, slug: "designing-spaces-people-love", img: "/blog-img-3.png", category: "Updates",
    title: "Designing Spaces People Love to Live In", excerpt: "Thoughtful layouts and human-centred details can turn a building into a comfortable home.",
    author: "Adam Olabode", publishedAt: "2025-07-06", displayDate: "06 Jul, 2025",
    content: [
      { heading: "Design begins with daily life", paragraphs: ["Beautiful spaces work best when they also make ordinary routines easier. Natural light, ventilation, storage, privacy, and sensible circulation have a direct effect on how a home feels.", "We begin with the people who will use the space, then shape the architecture around their needs."] },
      { heading: "Community is part of the plan", paragraphs: ["A home extends beyond its front door. Safe movement, shared green areas, dependable utilities, and places for neighbours to connect all contribute to lasting value."], points: ["Comfortable pedestrian routes", "Well-positioned shared amenities", "Durable materials that are easy to maintain"] },
    ],
  },
  {
    id: 4, slug: "finding-the-perfect-first-home", img: "/blog-img-1.png", category: "User Stories",
    title: "How One Family Found Their Perfect First Home", excerpt: "Follow one buyer's journey from their first inspection to receiving the keys to a new home.",
    author: "Adam Olabode", publishedAt: "2025-07-06", displayDate: "06 Jul, 2025",
    content: [
      { heading: "Turning a wish list into priorities", paragraphs: ["The family arrived with a long list of ideas, but three priorities quickly stood out: a manageable commute, room to grow, and a community that felt secure.", "Clarifying those needs helped them compare properties confidently instead of being distracted by features they would rarely use."] },
      { heading: "A decision built on confidence", paragraphs: ["After inspections, documentation checks, and a clear explanation of the payment process, they selected a home that met both their current needs and longer-term plans.", "The most important part of the journey was not speed. It was having enough reliable information to move forward without doubt."] },
    ],
  },
  {
    id: 5, slug: "latest-development-update", img: "/blog-img-2.png", category: "Updates",
    title: "What to Know About Our Latest Development", excerpt: "Discover the latest milestones, amenities, and availability from one of our growing communities.",
    author: "Adam Olabode", publishedAt: "2025-07-06", displayDate: "06 Jul, 2025",
    content: [
      { heading: "Progress on the ground", paragraphs: ["Site preparation and key infrastructure work are progressing in planned phases. This approach lets every stage meet the same quality and safety standards.", "Our team continues to coordinate access, drainage, power, and shared spaces as the community takes shape."], points: ["Defined internal road network", "Planned utility corridors", "Dedicated areas for community amenities"] },
      { heading: "What buyers can expect", paragraphs: ["Available options are designed for different ownership goals, from future homebuilding to longer-term investment. Our advisors can explain current availability, documentation, and payment milestones."] },
    ],
  },
  {
    id: 6, slug: "guide-to-choosing-residential-land", img: "/blog-img-3.png", category: "Tips",
    title: "A Smarter Guide to Choosing Residential Land", excerpt: "Practical questions to ask about title, access, utilities, and future development before buying.",
    author: "Adam Olabode", publishedAt: "2025-07-06", displayDate: "06 Jul, 2025",
    content: [
      { heading: "Inspect more than the plot", paragraphs: ["The land itself is only one part of the decision. Access roads, drainage, surrounding uses, topography, and utility plans can affect what you are able to build and how much development will cost."], points: ["Visit during different weather conditions", "Confirm boundaries against the survey", "Ask how utilities will reach the site"] },
      { heading: "Match the land to your timeline", paragraphs: ["A plot intended for immediate construction should meet different standards from land held for future growth. Be realistic about when you plan to build and the services you will need at that time.", "A clear timeline helps you avoid paying a premium for features you do not need—or buying too early in an area that cannot yet support your plans."] },
    ],
  },
];

export const blogCategories = ["All Categories", "User Stories", "Updates", "Feature Spotlights", "Tips"] as const;

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
