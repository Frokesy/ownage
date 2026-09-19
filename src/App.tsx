import React from 'react'
import Hero from './components/defaults/Hero';
import WhoWeAre from './components/home/WhoWeAre';
import Services from './components/home/Services';

const App = () => {
  return (
    <div>
      <Hero />
      <WhoWeAre />
      <Services />
    </div>
  )
}

export default App