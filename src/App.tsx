import React from 'react'
import Hero from './components/defaults/Hero';
import WhoWeAre from './components/home/WhoWeAre';
import Services from './components/home/Services';
import TheWhy from './components/home/TheWhy';

const App = () => {
  return (
    <div>
      <Hero />
      <WhoWeAre />
      <Services />
      <TheWhy />
    </div>
  )
}

export default App