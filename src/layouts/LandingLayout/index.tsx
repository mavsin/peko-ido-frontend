import { Outlet } from 'react-router-dom'
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function LandingLayout() {
  return (
    <div className="bg-[#222222] flex flex-col gap-8 min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}