"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function PageLayout({ children }: { children: ReactNode }) {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <section className="fixed sidebar min-h-screen shadow-lg bg-secondary">
        <Sidebar expand={expand} setExpand={setExpand} />
      </section>
      <section
        className={`ml-[80px] ${
          expand ? "lg:ml-[280px]" : "lg:ml-[80px]"
        } duration-200 min-h-screen h-full`}
      >
        <Navbar />
        {children}
      </section>
    </>
  );
}
