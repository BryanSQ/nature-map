import { Route, Routes } from "react-router-dom"


const AppRouter = () => {
 return(
  <Routes>
    <Route path="/" element={<div>Landing Page</div>} />
    <Route path="*" element={<div>404 NOT FOUND</div>} />
  </Routes>
 )  
}

export default AppRouter;