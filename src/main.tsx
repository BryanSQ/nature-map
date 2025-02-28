import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { libraryLoader } from './utils/googleMapsLibrary.ts'


import './index.css'
import AppRouter from './AppRouter.tsx'

libraryLoader();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
)
