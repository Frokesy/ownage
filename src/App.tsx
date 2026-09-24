import React from 'react'
import Hero from './components/defaults/Hero';
import WhoWeAre from './components/home/WhoWeAre';
import Services from './components/home/Services';
import TheWhy from './components/home/TheWhy';
import Experts from './components/home/Experts';
import Testimonials from './components/home/Testimonials';
import Blog from './components/home/Blog';

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
    </div>
  )
}

export default App