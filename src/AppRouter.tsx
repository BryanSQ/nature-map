import { Route, Routes } from "react-router-dom"
import { LandingPage } from "./components";


const AppRouter = () => {
 return(
  <Routes>
    <Route path="/" element={< LandingPage />} />
    <Route path="*" element={<div>404 NOT FOUND</div>} />
  </Routes>
 )  
}

export default AppRouter;