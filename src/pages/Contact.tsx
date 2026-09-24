import Footer from "../components/defaults/Footer";
import TopNav from "../components/defaults/TopNav";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-center px-4 py-6">
        <TopNav />
      </header>

      <div className="flex flex-col items-center justify-center space-y-3 px-5 py-10 text-center sm:py-14 lg:py-20">
        <h1 className="text-[38px] font-bold leading-tight sm:text-[50px]">Get in touch</h1>
        <p className="max-w-xl text-[16px] leading-7 text-[#0E2824] sm:text-[18px] lg:text-[22px]">
          We&apos;re here to help you with any questions you have.
        </p>
      </div>

      <main className="mx-auto my-6 flex w-[90%] max-w-7xl flex-col gap-12 sm:my-16 lg:my-24 lg:flex-row lg:justify-between lg:gap-16">
        <div className="space-y-8 lg:w-[40%]">
          <div className="space-y-3">
            <h2 className="text-[32px] font-semibold sm:text-[40px] lg:text-[50px]">Let&apos;s Talk</h2>
            <p className="text-[16px] leading-7 sm:text-[18px] lg:text-[20px] lg:leading-8">
              Have some big idea or plan to invest in real estate and need help?
              Reach out—we&apos;d love to hear about it and help you take the next step.
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-[22px] font-semibold lg:text-[28px]">Email</h2>
            <a className="block break-all text-[16px] hover:text-purple-20 sm:text-[18px] lg:text-[20px]" href="mailto:ownagegroup@gmail.com">
              ownagegroup@gmail.com
            </a>
          </div>
          <div className="space-y-3">
            <h2 className="text-[22px] font-semibold lg:text-[28px]">Socials</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[16px] sm:text-[18px] lg:flex-col lg:text-[20px]">
              <a href="#" className="underline underline-offset-4 hover:text-purple-20">Instagram</a>
              <a href="#" className="underline underline-offset-4 hover:text-purple-20">Twitter</a>
              <a href="#" className="underline underline-offset-4 hover:text-purple-20">Facebook</a>
            </div>
          </div>
        </div>

        <form className="space-y-5 lg:w-[50%]">
          <div className="space-y-3">
            <label className="font-medium" htmlFor="name">Name *</label>
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
            <label className="font-medium" htmlFor="email">Email *</label>
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
            <label className="font-medium" htmlFor="interest">What are you interested in buying? *</label>
            <select id="interest" name="interest" required defaultValue="" className="w-full rounded-lg bg-[#F7F7F7] px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-purple-20">
              <option value="" disabled>Select a property type</option>
              <option value="land">Land</option>
              <option value="residential">Residential property</option>
              <option value="commercial">Commercial property</option>
              <option value="investment">Investment property</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="font-medium" htmlFor="budget">Budget *</label>
            <select id="budget" name="budget" required defaultValue="" className="w-full rounded-lg bg-[#F7F7F7] px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-purple-20">
              <option value="" disabled>Select your budget range</option>
              <option value="under-10m">Under ₦10 million</option>
              <option value="10m-25m">₦10–25 million</option>
              <option value="25m-50m">₦25–50 million</option>
              <option value="above-50m">Above ₦50 million</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="font-medium" htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full resize-y rounded-lg bg-[#F7F7F7] px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-purple-20"
              placeholder="Tell us how we can help"
            />
          </div>

          <button type="submit" className="w-full rounded-xl bg-purple-20 py-3 text-center font-semibold text-white transition-colors hover:bg-purple-20/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-20">
            Submit
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
