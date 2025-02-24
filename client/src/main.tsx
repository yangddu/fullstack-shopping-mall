import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.tsx'
import './scss/index.scss'
import { BrowserRouter } from 'react-router-dom'
import { worker } from'./mocks/browser.ts'
import { RecoilRoot } from 'recoil';

if (import.meta.env.DEV) {
  worker.start();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
)
