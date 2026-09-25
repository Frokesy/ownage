import { Route, Routes } from "react-router-dom";
import Hero from "./components/defaults/Hero";
import WhoWeAre from "./components/home/WhoWeAre";
import Services from "./components/home/Services";
import TheWhy from "./components/home/TheWhy";
import Experts from "./components/home/Experts";
import Testimonials from "./components/home/Testimonials";
import Blog from "./components/home/Blog";
import Cta from "./components/home/Cta";
import Footer from "./components/defaults/Footer";
import Contact from "./pages/Contact";
import SiteBlog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Project from "./pages/Project";
import AboutUs from "./pages/AboutUs";

const Home = () => {
  return (
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
};

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/project" element={<Project />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/blog" element={<SiteBlog />} />
    <Route path="/blog/:slug" element={<BlogArticle />} />
    <Route path="/contact" element={<Contact />} />

    <Route path="*" element={<Home />} />
  </Routes>
);

export default App;
