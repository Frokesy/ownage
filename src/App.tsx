import React from 'react'
import Hero from './components/defaults/Hero';
import WhoWeAre from './components/home/WhoWeAre';
import Services from './components/home/Services';
import TheWhy from './components/home/TheWhy';
import Experts from './components/home/Experts';
import Testimonials from './components/home/Testimonials';
import Blog from './components/home/Blog';
import Cta from './components/home/Cta';
import Footer from './components/defaults/Footer';

const App = () => {
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
  )
}

export default App