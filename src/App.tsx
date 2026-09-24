import React from 'react'
import Hero from './components/defaults/Hero';
import WhoWeAre from './components/home/WhoWeAre';
import Services from './components/home/Services';
import TheWhy from './components/home/TheWhy';
import Experts from './components/home/Experts';
import Testimonials from './components/home/Testimonials';
import Blog from './components/home/Blog';
import Cta from './components/home/Cta';

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
    </div>
  )
}

export default App