import Hero from "../components/defaults/Hero";
import Footer from "../components/defaults/Footer";
import Blog from "../components/home/Blog";
import Cta from "../components/home/Cta";
import Experts from "../components/home/Experts";
import Services from "../components/home/Services";
import Testimonials from "../components/home/Testimonials";
import TheWhy from "../components/home/TheWhy";
import WhoWeAre from "../components/home/WhoWeAre";

const Home = () => (
  <div>
    <Hero />
    <WhoWeAre />
    <Services />
    <TheWhy />
    <Experts />
    <Testimonials />
    <Blog />
    <Cta />
    <Footer />
  </div>
);

export default Home;
