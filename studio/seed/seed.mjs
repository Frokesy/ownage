import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const studioRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectRoot = path.resolve(studioRoot, "..");
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token || token.includes("replace-with")) {
  throw new Error("Set SANITY_STUDIO_PROJECT_ID and a real SANITY_API_WRITE_TOKEN in studio/.env before seeding.");
}

const client = createClient({ projectId, dataset, token, apiVersion: "2026-09-01", useCdn: false });
const image = (src, alt) => ({ __image: src, alt });
const assetCache = new Map();

const MAX_UPLOADS = 3;
let activeUploads = 0;
const uploadQueue = [];

const runNextUpload = () => {
  if (activeUploads >= MAX_UPLOADS || uploadQueue.length === 0) return;
  activeUploads += 1;
  const { task, resolve, reject } = uploadQueue.shift();
  task()
    .then(resolve, reject)
    .finally(() => {
      activeUploads -= 1;
      runNextUpload();
    });
};

const limitUpload = (task) =>
  new Promise((resolve, reject) => {
    uploadQueue.push({ task, resolve, reject });
    runNextUpload();
  });

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const withRateLimitRetry = async (task, attempt = 0) => {
  try {
    return await task();
  } catch (error) {
    if (error?.statusCode !== 429 || attempt >= 4) throw error;
    const retryAfter = Number(error?.response?.headers?.["retry-after"] || 2);
    const delay = Math.max(retryAfter * 1000, 1000) + attempt * 500;
    process.stdout.write(`Sanity rate limit reached; retrying in ${Math.ceil(delay / 1000)}s...\n`);
    await wait(delay);
    return withRateLimitRetry(task, attempt + 1);
  }
};

const uploadImage = async ({ __image: src, alt }) => {
  if (!assetCache.has(src)) {
    assetCache.set(
      src,
      limitUpload(async () => {
        const filename = path.basename(src);
        const absolutePath = path.join(projectRoot, "public", src.replace(/^\//, ""));
        if (!fs.existsSync(absolutePath)) throw new Error(`Missing seed image: ${absolutePath}`);
        process.stdout.write(`Uploading ${src}...\n`);
        const asset = await withRateLimitRetry(() =>
          client.assets.upload("image", fs.createReadStream(absolutePath), { filename }),
        );
        return asset._id;
      }),
    );
  }
  return { _type: "image", asset: { _type: "reference", _ref: await assetCache.get(src) }, alt };
};

let keyCounter = 0;
const hydrate = async (value) => {
  if (value?.__image) return uploadImage(value);
  if (Array.isArray(value)) {
    return Promise.all(value.map(async (entry) => {
      const hydrated = await hydrate(entry);
      if (hydrated && typeof hydrated === "object" && !hydrated._key) hydrated._key = `seed-${++keyCounter}`;
      return hydrated;
    }));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(await Promise.all(Object.entries(value).map(async ([key, entry]) => [key, await hydrate(entry)])));
  }
  return value;
};

const settings = {
  _id: "siteSettings", _type: "siteSettings", companyName: "Ownage Group",
  logo: image("/logo.svg", "Ownage Group"),
  footerDescription: "Ownage Group is a real estate development company committed to creating exceptional spaces.",
  copyright: "Ownage Group 2026 © All Rights Reserved",
  navigation: [
    { label: "Home", href: "/" }, { label: "Project", href: "/project" }, { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "Careers 2", href: "/careers-2" }, { label: "Contact", href: "/contact" },
  ],
  footerGroups: [
    { title: "Explore", links: [{ label: "Home", href: "/" }, { label: "Project", href: "/project" }, { label: "About", href: "/about" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }] },
    { title: "Our Properties", links: [{ label: "Ownage Court", href: "/project" }, { label: "Ownage Estate", href: "/project" }, { label: "Ownage Residences", href: "/project" }, { label: "View All Projects", href: "/project", accent: true }] },
    { title: "Contact Us", links: [{ label: "12 Freedom Way, Ajibode, UI Ibadan", href: "https://maps.google.com/?q=12+Freedom+Way+Ajibode+UI+Ibadan" }, { label: "+234 801 234 5678", href: "tel:+2348012345678" }, { label: "hello@ownagegroup.com", href: "mailto:hello@ownagegroup.com" }] },
  ],
  socialLinks: [{ label: "Facebook", href: "#" }, { label: "Instagram", href: "#" }, { label: "X", href: "#" }, { label: "TikTok", href: "#" }],
  contactEmail: "hello@ownagegroup.com", contactPhone: "+234 801 234 5678", address: "12 Freedom Way, Ajibode, UI Ibadan",
};

const pages = [
  {
    _id: "page-home", _type: "pageContent", pageKey: "home",
    hero: { title: "Ready to Own Your First Piece of Land?", subtitle: "Find the right land, secure your ownership, and take the first step toward building something that lasts.", primaryLabel: "Explore Our Listing", primaryHref: "/project", secondaryLabel: "About Ownage Group", secondaryHref: "/about", image: image("/hero.png", ""), images: [image("/hero-img-2.png", "A completed residential development"), image("/hero-img-1.png", "A residential estate property")] },
    sections: [
      { key: "whoWeAre", eyebrow: "Who We Are", title: "We Create places Designed for the way People wants to live", body: ["Ownage Group is a real estate development company committed to creating exceptional spaces that inspire, connect and grow in value overtime.", "From strategic locations to quality construction, we build more than properties, we build lifestyles and secure futures."], buttonLabel: "Learn More", buttonHref: "/about", image: image("/img-one.png", "Who We Are") },
      { key: "services", title: "Find Your Next Place", subtitle: "Good property is more than four walls and a location. We look for the right place, the right purpose, and the right potential.", image: image("/service-bg.png", ""), items: [
        { title: "Ownage Court", subtitle: "Premium residential plots", location: "Lagos, Nigeria", image: image("/court.jpg", "Ownage Court") },
        { title: "Ownage Residence", subtitle: "Contemporary family homes", location: "Lekki, Lagos", image: image("/residence.jpg", "Ownage Residence") },
        { title: "The Ownage Estate", subtitle: "Secure serviced plots", location: "Epe, Lagos", image: image("/estate.jpg", "The Ownage Estate") },
        { title: "Court Gardens", subtitle: "Thoughtfully planned community", location: "Ibeju-Lekki, Lagos", image: image("/court.jpg", "Court Gardens") },
        { title: "Residence Two", subtitle: "Modern urban residences", location: "Ajah, Lagos", image: image("/residence.jpg", "Residence Two") },
        { title: "Estate Park", subtitle: "Land built for lasting value", location: "Lagos, Nigeria", image: image("/estate.jpg", "Estate Park") },
      ] },
      { key: "whyOwnage", title: "Why Ownage?", subtitle: "We go beyond buildings, we deliver trust experiences, quality, and lasting value in every project we undertake.", images: [image("/residence.jpg", "Ownage residence"), image("/hero-img-2.png", "Ownage development"), image("/court.jpg", "Ownage court"), image("/estate.jpg", "Ownage estate")], items: [
        { title: "Good Space", text: "We create spaces with intention, blending functionality, aesthetics, and comfort for better living." }, { title: "Trusted Expertise", text: "Our team brings deep industry knowledge and years of experience you can rely on." }, { title: "Built to Last", text: "We use quality materials and proven methods to ensure durability and long-term value." }, { title: "Client Focused", text: "Your goals are our priority. We listen, communicate and deliver beyond expectations." },
      ] },
      { key: "experts", title: "We Are Experts in Building Dreams.", subtitle: "From our humble beginnings to the growing communities we've built today. Our journey is driven by a simple belief: everyone deserves a place they are proud to call their own.", buttonLabel: "Join the Tribe", buttonHref: "/careers-2", image: image("/experts-bg.png", "The Ownage property experts"), images: [image("/experts-purple-bg.png", "")] },
      { key: "testimonials", title: "What some of our happy clients say", subtitle: "Trusted by people, chosen for a reason", image: image("/people-grouped.png", "Ownage client community"), images: [image("/service-bg.png", "")], items: [
        { title: "Tunde Adeyemi", subtitle: "Homeowner", text: "From the first site inspection to getting the keys, the entire process was smooth and transparent. Ownage Group truly delivers on its promise of quality and value.", image: image("/about/tunde.png", "Tunde Adeyemi") },
        { title: "Funmi Akinola", subtitle: "Property Investor", text: "The team explained every stage clearly and helped me choose a property that matched my long-term goals.", image: image("/about/funmi.png", "Funmi Akinola") },
        { title: "Kunle Babatunde", subtitle: "Landowner", text: "What stood out was the attention to detail and honest communication.", image: image("/about/kunle.png", "Kunle Babatunde") },
      ] },
      { key: "latestNews", accent: "Latest", title: "News", buttonLabel: "Explore more", buttonHref: "/blog" },
      { key: "cta", title: "Looking for Your Next Home or a smart Investment. 😍", subtitle: "Join more than 200+ happy customers", buttonLabel: "See Properties", buttonHref: "/project", image: image("/people.png", "Happy Ownage customers") },
    ],
  },
  {
    _id: "page-about", _type: "pageContent", pageKey: "about", hero: { title: "About Us", subtitle: "We're building more than properties—we are building legacies." },
    sections: [
      { key: "intro", eyebrow: "About Ownage group", body: ["Ownage Group is a real estate development company committed to creating exceptional spaces that inspire, connect and grow in value overtime.", "From strategic locations to quality construction, we build more than properties, we build lifestyles and secure futures.", "From our humble beginnings to the growing communities we've built today, our journey is driven by a simple belief: everyone deserves a place they are proud to call their own."], images: [image("/about/img-one.png", "Ownage Group development"), image("/about/img-two.png", "Modern property exterior"), image("/about/img-three.png", "Ownage residential development")] },
      { key: "principles", items: [{ title: "Our Mission", text: "Our mission is to develop exceptional real estate opportunities that combine thoughtful planning, quality, and lasting value." }, { title: "Our Vision", text: "We envision a future where real estate becomes a foundation for better living, stronger communities, and meaningful growth." }, { title: "Our Expertise", text: "Our strength lies in market insight, strategic planning, thoughtful design, and a deep understanding of lasting property value." }, { title: "Our Values", text: "Integrity guides our decisions, excellence shapes our work, and people remain at the heart of everything we create." }] },
      { key: "story", eyebrow: "Our Story", body: ["From a vision to impactful developments, Ownage Group was founded to redefine real estate development through quality, integrity, and long-term value.", "What started as a small team with big dreams has grown into a strong brand known for delivering quality properties in prime locations.", "Today, we continue to push boundaries, raise standards, and create communities where people can truly thrive."], images: [image("/about/img-four.png", "A completed Ownage property"), image("/about/img-five.png", "An Ownage development site")] },
      { key: "leadership", title: "The leaders behind the vision", subtitle: "Our leadership team brings experience, passion, and purpose.", items: [{ title: "Tunde Adeyemo", subtitle: "Chief Executive Officer", image: image("/about/tunde.png", "Tunde Adeyemo") }, { title: "Funmi Akinola", subtitle: "Chief Operating Officer", image: image("/about/funmi.png", "Funmi Akinola") }, { title: "Kunle Babatunde", subtitle: "Head of Department", image: image("/about/kunle.png", "Kunle Babatunde") }, { title: "Joy Adams", subtitle: "People Operations Lead", image: image("/about/joy.png", "Joy Adams") }] },
    ],
  },
  {
    _id: "page-projects", _type: "pageContent", pageKey: "projects", hero: { title: "Our Projects", subtitle: "See all of our properties" },
    sections: [{ key: "properties", items: [
      { title: "Ownage Court", subtitle: "Premium residential plots, designed for modern living and lasting value", label: "Real Estate", location: "Moniya, Ibadan", price: "₦8,500,000", value: "500 sqm", status: "Available", text: "Ownage Court is a thoughtfully planned residential community designed for buyers seeking secure ownership, practical infrastructure, and strong long-term value.", image: image("/project-dummy.png", "Ownage Court"), details: ["Verified documentation", "Accessible road network", "Planned drainage", "Perimeter security", "Flexible payment plan", "Residential zoning"], options: [{ label: "300 sqm", value: "₦6,500,000" }, { label: "500 sqm", value: "₦8,500,000" }, { label: "600 sqm", value: "₦10,000,000" }] },
      { title: "Ownage Court Premium", subtitle: "A larger serviced plot for a generous family residence", label: "Real Estate", location: "Moniya, Ibadan", price: "₦12,000,000", value: "600 sqm", status: "Selling fast", text: "This serviced plot option offers additional space with access to planned community infrastructure and a professional documentation process.", image: image("/project-dummy.png", "Ownage Court Premium"), details: ["Corner-piece options", "Survey documentation", "Estate road access", "Drainage provision", "Community planning", "Development support"] },
    ] }],
  },
  { _id: "page-blog", _type: "pageContent", pageKey: "blog", hero: { title: "Blog Articles", subtitle: "Perspectives and practical insights on real estate" }, sections: [] },
  {
    _id: "page-careers", _type: "pageContent", pageKey: "careers", hero: { title: "Build Your Future In Real Estate", subtitle: "Learn the business. Build the skills, Grow your opportunities with Ownage Group.", primaryLabel: "Become a realtor", primaryHref: "#opportunity" },
    sections: [
      { key: "propertyGallery", images: [image("/court.jpg", "Ownage Court development"), image("/residence.jpg", "Ownage residential property"), image("/estate.jpg", "Ownage estate development")] },
      { key: "skills", title: "Your Real Estate Journey Starts Here", subtitle: "Discover an opportunity to learn the real estate business, develop practical skills and build the confidence to take your next step in property.", items: [{ title: "Real Estate Knowledge", text: "Learn the fundamentals of property, the market and the real estate business." }, { title: "Sales & Marketing", text: "Develop practical skills for presenting properties and connecting with potential clients." }, { title: "Client Relations", text: "Learn how to communicate professionally and build lasting relationships." }, { title: "Professional Growth", text: "Keep learning, build your network and grow your opportunities in real estate." }] },
      { key: "journeyGallery", eyebrow: "The Real Estate Journey", title: "Learn. Connect. Grow", images: [image("/careers/img-one.png", "Ownage realtors learning together"), image("/careers/img-two.png", "Ownage team member at work"), image("/careers/img-three.png", "Ownage real estate team")] },
      { key: "opportunity", title: "Your Opportunity to Grow", subtitle: "At Ownage Group, we believe real estate is more than property. It is an opportunity to learn, build relationships, and create lasting value.", image: image("/careers/img-four.png", "Ownage realtor training session"), items: ["Real Estate Knowledge", "Practical Sales Skills", "Property Marketing", "Client Relations", "Industry Networking", "Professional Growth"].map((title) => ({ title })) },
      { key: "startJourney", title: "Start Your Real Estate Journey", subtitle: "Whether you are new to real estate or looking to develop your skills, Ownage gives you an opportunity to learn, connect, and explore the property business.", image: image("/careers/img-five.png", "Ownage real estate professionals") },
    ],
  },
  {
    _id: "page-careers-two", _type: "pageContent", pageKey: "careersTwo", hero: { title: "Start your Real Estate Journey", subtitle: "Join a growing community of real estate professionals. Learn how property sales work, develop your skills, and start building meaningful opportunities with Ownage Group.", primaryLabel: "Join the team", primaryHref: "#opportunity" },
    sections: [
      { key: "howItWorks", eyebrow: "Your Journey Starts here", title: "How it Works", subtitle: "Getting started with Ownage Group is simple. Take the first step, learn the business, and begin building your real estate journey.", items: [{ title: "01 Apply", text: "Complete the realtor application form, and tell us a little about yourself." }, { title: "02 Get Started", text: "Take the next step towards becoming part of Ownage Group's realtor opportunity." }, { title: "03 Learn & Grow", text: "Build your understanding of real estate and develop the skills needed to succeed." }, { title: "04 Build your network", text: "Connect with clients, other professionals, and explore new opportunities." }] },
      { key: "application", eyebrow: "Apply Now", title: "Become a Realtor with Ownage Group", subtitle: "Take the first step toward your real estate journey with Ownage Group. Complete the form below and our team will be in touch with you.", image: image("/careers/img-six.png", "Ownage realtor application") },
    ],
  },
  {
    _id: "page-contact", _type: "pageContent", pageKey: "contact", hero: { title: "Get in touch", subtitle: "We're here to help you with any questions you have." },
    sections: [
      { key: "intro", title: "Let's Talk", subtitle: "Have some big idea or plan to invest in real estate and need help? Reach out—we'd love to hear about it and help you take the next step." },
      { key: "interestOptions", items: [{ title: "Land", value: "land" }, { title: "Residential property", value: "residential" }, { title: "Commercial property", value: "commercial" }, { title: "Investment property", value: "investment" }] },
      { key: "budgetOptions", items: [{ title: "Under ₦10 million", value: "under-10m" }, { title: "₦10–25 million", value: "10m-25m" }, { title: "₦25–50 million", value: "25m-50m" }, { title: "Above ₦50 million", value: "above-50m" }] },
    ],
  },
];

const ids = [settings._id, ...pages.map((page) => page._id)];
const existing = await client.fetch("count(*[_id in $ids])", { ids });
if (existing > 0 && !process.argv.includes("--force")) {
  throw new Error(`Found ${existing} seeded document(s). Refusing to overwrite them. Run npm run seed -- --force only if you intentionally want to restore the starter content.`);
}

const documents = await Promise.all([settings, ...pages].map(hydrate));
let transaction = client.transaction();
for (const document of documents) transaction = transaction.createOrReplace(document);
await transaction.commit();
process.stdout.write(`Seeded ${documents.length} documents into ${projectId}/${dataset}.\n`);
