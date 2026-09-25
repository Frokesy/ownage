import Footer from "../components/defaults/Footer";
import TopNav from "../components/defaults/TopNav";
import {
  ExpertiseIcon,
  MissionIcon,
  ValuesIcon,
  VisionIcon,
} from "../components/icons";
import { findCmsSection, useCmsPage } from "../context/SiteContentContext";

const AboutUs = () => {
  const page = useCmsPage("about");
  const intro = findCmsSection(page, "intro");
  const principles = findCmsSection(page, "principles");
  const story = findCmsSection(page, "story");
  const leadership = findCmsSection(page, "leadership");
  const principleIcons = [<MissionIcon />, <VisionIcon />, <ExpertiseIcon />, <ValuesIcon />];
  const fallbackItems = [
    {
      id: 1,
      icon: <MissionIcon />,
      title: "Our Mission",
      subtext:
        "Our mission is to develop exceptional real estate opportunities that combine thoughtful planning, quality, and lasting value. We are committed to creating spaces that meet real needs, serve communities, and give our clients confidence in what they choose to own.",
    },
    {
      id: 2,
      icon: <VisionIcon />,
      title: "Our Vision",
      subtext:
        "We envision a future where real estate goes beyond buildings and becomes a foundation for better living, stronger communities, and meaningful growth. Ownage Group aims to become a trusted name in property development, creating places that remain valuable for generations to come.",
    },
    {
      id: 3,
      icon: <ExpertiseIcon />,
      title: "Our Expertise",
      subtext:
        "Our strength lies in how we approach every development. We bring together market insight, strategic planning, thoughtful design, and a deep understanding of what makes a property truly valuable. From identifying the right opportunities to delivering quality developments, we focus on the details that turn a property into something worth owning.",
    },
    {
      id: 4,
      icon: <ValuesIcon />,
      title: "Our Values",
      subtext:
        "We believe great real estate begins with strong principles. Integrity guides our decisions, excellence shapes our work, and people remain at the heart of everything we create. We are committed to being transparent, delivering on our promises, and building relationships that stand the test of time.",
    },
  ];

  const fallbackPeople = [
    {
      id: 1,
      avatar: "/about/tunde.png",
      name: "Tunde Adeyemo",
      role: "Chief Executive Officer",
    },
    {
      id: 2,
      avatar: "/about/funmi.png",
      name: "Funmi Akinola",
      role: "Chief Operating Officer",
    },
    {
      id: 3,
      avatar: "/about/kunle.png",
      name: "Kunle Babatunde",
      role: "Head of Department",
    },
    {
      id: 4,
      avatar: "/about/joy.png",
      name: "Joy Adams",
      role: "People Operations Lead",
    },
  ];
  const items = principles?.items?.length
    ? principles.items.map((item, index) => ({ id: item._key || index, icon: principleIcons[index % principleIcons.length], title: item.title || "", subtext: item.text || "" }))
    : fallbackItems;
  const people = leadership?.items?.length
    ? leadership.items.map((item, index) => ({ id: item._key || index, avatar: item.image?.url || "/about/tunde.png", name: item.title || "Team member", role: item.subtitle || "" }))
    : fallbackPeople;
  const introImages = intro?.images || [];
  const storyImages = story?.images || [];
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-center px-4 py-6">
        <TopNav />
      </header>

      <div className="flex flex-col items-center justify-center space-y-3 px-5 py-10 text-center sm:py-14 lg:py-20">
        <h1 className="text-[38px] font-bold leading-tight sm:text-[50px]">
          {page?.hero?.title || <>About <span className="text-purple-20">Us</span></>}
        </h1>
        <p className="max-w-xl text-[16px] leading-7 text-[#0E2824] sm:text-[18px] lg:text-[22px]">
          {page?.hero?.subtitle || "We're building more than properties—we are building legacies."}
        </p>
      </div>

      <main>
        <section className="mx-auto mt-8 flex w-[90%] max-w-7xl flex-col items-center justify-between gap-10 sm:mt-12 lg:mt-20 lg:flex-row lg:gap-12">
          <div className="w-full space-y-3 sm:space-y-4 lg:w-[50%]">
            <img
              src={introImages[0]?.url || "/about/img-one.png"}
              alt={introImages[0]?.alt || "Ownage Group development"}
              className="micro-image h-[260px] w-full rounded-xl object-cover sm:h-auto"
            />
            <div className="flex gap-3 sm:gap-5">
              <img
                src={introImages[1]?.url || "/about/img-two.png"}
                alt={introImages[1]?.alt || "Modern property exterior"}
                className="micro-image h-[150px] w-[40%] rounded-xl object-cover sm:h-auto"
              />
              <img
                src={introImages[2]?.url || "/about/img-three.png"}
                alt={introImages[2]?.alt || "Ownage residential development"}
                className="micro-image h-[150px] min-w-0 flex-1 rounded-xl object-cover sm:h-auto"
              />
            </div>
          </div>

          <div className="space-y-5 lg:w-[50%] lg:space-y-8">
            <div className="space-y-3">
              <h2 className="lg:text-[18px] text-purple-20 font-semibold uppercase">
                {intro?.eyebrow || "About Ownage group"}
              </h2>
              <p className="text-[16px] leading-8 sm:text-[20px] lg:text-[24px] lg:leading-10">
                {intro?.body?.[0] || "Ownage Group is a real estate development company committed to creating exceptional spaces that inspire, connect and grow in value overtime."}
              </p>
            </div>
            <p className="text-[16px] leading-7 sm:text-[18px] lg:text-[24px] lg:leading-10">
              {intro?.body?.[1] || "From strategic locations to quality construction, we build more than properties, we build lifestyles and secure futures."}
            </p>
            <p className="text-[16px] leading-7 sm:text-[18px] lg:text-[24px] lg:leading-10">
              {intro?.body?.[2] || "From our humble beginnings to the growing communities we've built today, our journey is driven by a simple belief: everyone deserves a place they are proud to call their own."}
            </p>
          </div>
        </section>

        <section
          aria-label="Our mission, vision, expertise and values"
          className="scrollbar-hide mx-auto my-14 flex w-[90%] max-w-7xl snap-x snap-mandatory items-stretch gap-5 overflow-x-auto pb-5 sm:my-16 lg:my-20 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0"
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="w-[84vw] max-w-[340px] shrink-0 snap-start space-y-4 rounded-xl bg-white p-5 shadow-md transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-2xl sm:w-[320px] lg:w-auto lg:max-w-none"
            >
              <div aria-hidden="true">{item.icon}</div>
              <h2 className="text-[20px] font-semibold uppercase lg:text-[24px]">
                {item.title}
              </h2>
              <p className="text-[14px] leading-6 text-[#383838]">
                {item.subtext}
              </p>
            </article>
          ))}
        </section>

        <section className="bg-[#FCCB0714] py-12 lg:py-20">
          <div className="mx-auto flex w-[90%] max-w-7xl flex-col items-center justify-between gap-9 lg:flex-row lg:gap-12">
            <div className="space-y-4 lg:w-[50%]">
              <h2 className="lg:text-[18px] text-purple-20 font-semibold uppercase">
                {story?.eyebrow || "Our Story"}
              </h2>
              <p className="text-[16px] leading-7 lg:text-[20px] lg:leading-8">
                {story?.body?.[0] || "From a vision to impactful developments, Ownage Group was founded with a clear vision: to redefine real estate development by focusing on quality, integrity, and long-term value."}
              </p>
              <p className="text-[16px] leading-7 lg:text-[20px] lg:leading-8">
                {story?.body?.[1] || "What started as a small team with big dreams has grown into a strong brand known for delivering quality properties in prime locations."}
              </p>
              <p className="text-[16px] leading-7 lg:text-[20px] lg:leading-8">
                {story?.body?.[2] || "Today, we continue to push boundaries, raise standards, and create communities where people can truly thrive."}
              </p>
            </div>

            <div className="flex w-full gap-3 sm:gap-4 lg:w-[50%]">
              <img
                src={storyImages[0]?.url || "/about/img-four.png"}
                alt={storyImages[0]?.alt || "A completed Ownage property"}
                className="micro-image h-[260px] min-w-0 flex-1 rounded-xl object-cover sm:h-auto"
              />
              <img
                src={storyImages[1]?.url || "/about/img-five.png"}
                alt={storyImages[1]?.alt || "An Ownage development site"}
                className="micro-image h-[260px] min-w-0 flex-1 rounded-xl object-cover sm:h-auto"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto my-14 w-[90%] max-w-7xl lg:my-20">
          <h2 className="text-[28px] font-semibold text-purple-20 sm:text-[32px] lg:text-[36px]">
            {leadership?.title || "The leaders behind the vision"}
          </h2>
          <p className="my-3 text-[16px] leading-7 lg:text-[20px]">
            {leadership?.subtitle || "Our leadership team brings experience, passion, and purpose."}
          </p>
          <div className="scrollbar-hide mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 lg:grid lg:grid-cols-4 lg:gap-7 lg:overflow-visible lg:pb-0">
            {people.map((person) => (
              <article
                key={person.id}
                className="w-[78vw] max-w-[300px] shrink-0 snap-start rounded-xl bg-white p-3 shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-2xl sm:w-[280px] lg:w-auto lg:max-w-none"
              >
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="aspect-[4/5] w-full rounded-lg object-cover"
                />
                <h2 className="text-[20px] mt-4 mb-2 text-purple-20 font-semibold">
                  {person.name}
                </h2>
                <p className="text-[14px]">{person.role}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <div className="lg:mt-20 mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
