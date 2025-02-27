import type { ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const Layout = ({ children }: layoutProps) => {
  return (
    <main className="app-layout">
      {children}
    </main>
  )
}
export default Layout;