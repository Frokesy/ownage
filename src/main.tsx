import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/kaushan-script/400.css'
import '@fontsource/nunito-sans/400.css'
import '@fontsource/nunito-sans/600.css'
import '@fontsource/nunito-sans/700.css'
import '@fontsource/lexend/400.css'
import '@fontsource/lexend/600.css'
import '@fontsource/lexend/700.css'
import App from './App'
import './index.css'
import { BlogProvider } from './context/BlogContext'
import { SiteContentProvider } from './context/SiteContentContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BlogProvider>
        <SiteContentProvider>
          <App />
        </SiteContentProvider>
      </BlogProvider>
    </BrowserRouter>
  </StrictMode>,
)
