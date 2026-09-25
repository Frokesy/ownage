import { useState } from "react";
import type { FormEvent } from "react";
import Footer from "../components/defaults/Footer";
import TopNav from "../components/defaults/TopNav";
import { findCmsSection, useCmsPage, useSiteContent } from "../context/SiteContentContext";
import { sendEmailForm } from "../lib/email";

const Contact = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const page = useCmsPage("contact");
  const intro = findCmsSection(page, "intro");
  const interestOptions = findCmsSection(page, "interestOptions")?.items;
  const budgetOptions = findCmsSection(page, "budgetOptions")?.items;
  const { settings } = useSiteContent();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus("sending");
    setFormMessage("");
    try {
      await sendEmailForm(form, "contact");
      form.reset();
      setFormStatus("success");
      setFormMessage("Thanks—your message has been sent. We’ll get back to you shortly.");
    } catch (error) {
      console.error("Contact form email failed", error);
      setFormStatus("error");
      setFormMessage(error instanceof Error ? error.message : "We couldn’t send your message. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-center px-4 py-6">
        <TopNav />
      </header>

      <div className="flex flex-col items-center justify-center space-y-3 px-5 py-10 text-center sm:py-14 lg:py-20">
        <h1 className="text-[38px] font-bold leading-tight sm:text-[50px]">
          {page?.hero?.title || "Get in touch"}
        </h1>
        <p className="max-w-xl text-[16px] leading-7 text-[#0E2824] sm:text-[18px] lg:text-[22px]">
          {page?.hero?.subtitle || "We're here to help you with any questions you have."}
        </p>
      </div>

      <main className="mx-auto my-6 flex w-[90%] max-w-7xl flex-col gap-12 sm:my-16 lg:my-24 lg:flex-row lg:justify-between lg:gap-16">
        <div className="space-y-8 lg:w-[40%]">
          <div className="space-y-3">
            <h2 className="text-[32px] font-semibold sm:text-[40px] lg:text-[50px]">
              {intro?.title || "Let's Talk"}
            </h2>
            <p className="text-[16px] leading-7 sm:text-[18px] lg:text-[20px] lg:leading-8">
              {intro?.subtitle || "Have some big idea or plan to invest in real estate and need help? Reach out—we'd love to hear about it and help you take the next step."}
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-[22px] font-semibold lg:text-[28px]">Email</h2>
            <a
              className="block break-all text-[16px] hover:text-purple-20 sm:text-[18px] lg:text-[20px]"
              href={`mailto:${settings?.contactEmail || "ownagegroup@gmail.com"}`}
            >
              {settings?.contactEmail || "ownagegroup@gmail.com"}
            </a>
          </div>
          <div className="space-y-3">
            <h2 className="text-[22px] font-semibold lg:text-[28px]">
              Socials
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[16px] sm:text-[18px] lg:flex-col lg:text-[20px]">
              <a
                href={settings?.socialLinks?.find((item) => item.label === "Instagram")?.href || "#"}
                className="underline underline-offset-4 hover:text-purple-20"
              >
                Instagram
              </a>
              <a
                href={settings?.socialLinks?.find((item) => item.label === "X" || item.label === "Twitter")?.href || "#"}
                className="underline underline-offset-4 hover:text-purple-20"
              >
                Twitter
              </a>
              <a
                href={settings?.socialLinks?.find((item) => item.label === "Facebook")?.href || "#"}
                className="underline underline-offset-4 hover:text-purple-20"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-5 lg:w-[50%]">
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="space-y-3">
            <label className="font-medium" htmlFor="name">
              Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="w-full rounded-lg bg-[#F7F7F7] px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-purple-20"
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-3">
            <label className="font-medium" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg bg-[#F7F7F7] px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-purple-20"
              placeholder="Enter your email address"
            />
          </div>
          <div className="space-y-3">
            <label className="font-medium" htmlFor="interest">
              What are you interested in buying? *
            </label>
            <select
              id="interest"
              name="interest"
              required
              defaultValue=""
              className="w-full rounded-lg bg-[#F7F7F7] px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-purple-20"
            >
              <option value="" disabled>
                Select a property type
              </option>
              {(interestOptions?.length ? interestOptions : [
                { title: "Land", value: "land" }, { title: "Residential property", value: "residential" },
                { title: "Commercial property", value: "commercial" }, { title: "Investment property", value: "investment" },
              ]).map((option) => <option key={option.value || option.title} value={option.value || option.title}>{option.title}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <label className="font-medium" htmlFor="budget">
              Budget *
            </label>
            <select
              id="budget"
              name="budget"
              required
              defaultValue=""
              className="w-full rounded-lg bg-[#F7F7F7] px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-purple-20"
            >
              <option value="" disabled>
                Select your budget range
              </option>
              {(budgetOptions?.length ? budgetOptions : [
                { title: "Under ₦10 million", value: "under-10m" }, { title: "₦10–25 million", value: "10m-25m" },
                { title: "₦25–50 million", value: "25m-50m" }, { title: "Above ₦50 million", value: "above-50m" },
              ]).map((option) => <option key={option.value || option.title} value={option.value || option.title}>{option.title}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <label className="font-medium" htmlFor="message">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full resize-y rounded-lg bg-[#F7F7F7] px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-purple-20"
              placeholder="Tell us how we can help"
            />
          </div>

          <button
            type="submit"
            disabled={formStatus === "sending"}
            className="micro-button w-full rounded-xl bg-purple-20 py-3 text-center font-semibold text-white hover:bg-purple-20/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-20 disabled:cursor-wait disabled:opacity-60"
          >
            {formStatus === "sending" ? "Sending…" : "Submit"}
          </button>
          {formMessage && (
            <p role="status" aria-live="polite" className={`rounded-lg px-4 py-3 text-sm ${formStatus === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
              {formMessage}
            </p>
          )}
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
