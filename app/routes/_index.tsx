import type { V2_MetaFunction } from "@remix-run/node";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="bg-[#222222] flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1"></div>
      <Footer />
    </div>
  );
}
