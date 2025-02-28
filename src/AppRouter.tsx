import { Route, Routes } from "react-router-dom"
import { LandingPage } from "./components";
import { Layout } from "./components/Layout";

import { App } from "./components";

import './App.css'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={< LandingPage />} />

      <Route path="/app" element={<Layout />}>
        <Route index element={<App />} />

      </Route>

      <Route path="/favorites" element={<div>LOS FAVORITOS DE LA GENTE</div>} />


      <Route path="*" element={<div>404 NOT FOUND</div>} />
    </Routes>
  )
}

export default AppRouter;