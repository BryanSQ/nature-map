import { Outlet } from "react-router-dom";


export const Layout = () => {
  return (
    <main className="app-layout">
      <Outlet />
    </main>
  );
};