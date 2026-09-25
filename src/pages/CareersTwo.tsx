import TopNav from "../components/defaults/TopNav";
import {
  ApplyIcon,
  BookIcon,
  GetStartedIcon,
  PeopleIcon,
} from "../components/icons";
import Footer from "../components/defaults/Footer";

const CareersTwo = () => {
  const steps = [
    {
      id: 1,
      icon: <ApplyIcon />,
      title: "01 Apply",
      description:
        "Complete the realtor application form, and tell us a little about yourself.",
    },
    {
      id: 2,
      icon: <GetStartedIcon />,
      title: "02 Get Started",
      description:
        "Take the next step towards becoming part of Ownage group realtor opportunity.",
    },
    {
      id: 3,
      icon: <BookIcon />,
      title: "03 Learn & Grow",
      description:
        "Build your understanding of real estate and develop the skills needed to succeed.",
    },
    {
      id: 4,
      icon: <PeopleIcon />,
      title: "04 Build your network",
      description:
        "Connect with clients, other professionals, and explore new opportunities.",
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-center px-4 py-6">
        <TopNav />
      </header>

      <div className="flex flex-col items-center justify-center space-y-3 px-5 py-10 text-center sm:py-14 lg:py-20">
        <h1 className="text-[38px] font-bold leading-tight sm:text-[50px]">
          Start your <span className="text-purple-20">Real Estate</span> Journey
        </h1>
        <p className="max-w-xl text-[16px] leading-7 text-[#0E2824] sm:text-[18px] lg:text-[22px]">
          Join a growing community of real estate professionals. Learn how
          property sales work, develop your skills, and start building
          meaningful opportunities with Ownage Group.
        </p>
        <a
          href="#opportunity"
          className="micro-button rounded-xl bg-purple-20 px-8 py-3 text-[16px] font-semibold text-white hover:bg-purple-20/90 sm:px-10 sm:text-[18px]"
        >
          Join the team
        </a>
      </div>

      <main>
        <section className="mx-auto mt-10 flex w-[90%] max-w-7xl flex-col justify-between gap-10 lg:mt-20 lg:flex-row lg:gap-12">
          <div className="lg:w-[40%]">
            <p className="uppercase text-purple-20 font-semibold">
              Your Journey Starts here
            </p>
            <h2 className="lg:text-[36px] text-[30px] font-semibold">
              How it Works
            </h2>
            <p className="mt-3 text-[16px] leading-7 sm:text-[18px] lg:text-[22px] lg:leading-9">
              Getting started with Ownage Group is simple. Take the first step,
              learn the business, and begin building your real estate journey.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10 lg:w-[55%]">
            {steps.map((step) => (
              <article
                className="space-y-4 rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                key={step.id}
              >
                <div aria-hidden="true">{step.icon}</div>
                <h2 className="lg:text-[18px] text-[16px] uppercase font-semibold">
                  {step.title}
                </h2>
                <p className="text-[14px] leading-6 lg:text-[16px]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="opportunity"
          className="mt-14 scroll-mt-6 bg-[#F9F9F9] py-12 lg:mt-20 lg:py-20"
        >
          <div className="mx-auto flex w-[90%] max-w-7xl flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-14">
            <div className="w-full lg:w-[50%]">
              <p className="uppercase text-purple-20 font-semibold">
                Apply Now
              </p>
              <h2 className="lg:text-[36px] text-[30px] font-semibold">
                Become a Realtor with Ownage Group
              </h2>
              <p className="my-4 text-[16px] leading-7 sm:text-[18px] lg:text-[20px] lg:leading-8">
                Take the first step toward your real estate journey with Ownage
                Group. Complete the form below and our team will be in touch
                with you.
              </p>
              <img
                src="/careers/img-six.png"
                alt="Ownage realtor application"
                className="micro-image w-full rounded-2xl object-cover"
              />
            </div>
            <form className="w-full space-y-5 lg:w-[50%]">
              <div className="space-y-3">
                <label className="font-medium" htmlFor="name">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full rounded-lg bg-[#ffffff] px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-purple-20"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-3">
                <label className="font-medium" htmlFor="email">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg bg-[#ffffff] px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-purple-20"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="space-y-3">
                <label className="font-medium" htmlFor="phone">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="w-full rounded-lg bg-[#ffffff] px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-purple-20"
                  placeholder="Enter your phone number"
                />
              </div>
              <fieldset className="space-y-3">
                <legend className="font-medium">
                  Have you worked in real estate before? *
                </legend>
                <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
                  {["Yes", "No"].map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-black/10 bg-white px-4 py-3 transition-colors has-[:checked]:border-purple-20 has-[:checked]:bg-purple-20/10 sm:min-w-28"
                    >
                      <input
                        type="radio"
                        name="realEstateExperience"
                        value={option.toLowerCase()}
                        required
                        className="h-4 w-4 accent-[#813993]"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="space-y-3">
                <label className="font-medium" htmlFor="location">
                  Location *
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  autoComplete="address-level2"
                  className="w-full rounded-lg bg-[#ffffff] px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-purple-20"
                  placeholder="Where are you based?"
                />
              </div>
              <div className="space-y-3">
                <label className="font-medium" htmlFor="message">
                  Why are you interested in becoming a realtor *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-y rounded-lg bg-white px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-purple-20"
                  placeholder="Tell us a little about yourself"
                />
              </div>
              <button
                type="submit"
                className="micro-button w-full rounded-xl bg-purple-20 px-6 py-3 font-semibold text-white hover:bg-purple-20/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-20"
              >
                Submit application
              </button>
            </form>
          </div>
        </section>
      </main>

      <div className="lg:mt-20 mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default CareersTwo;
