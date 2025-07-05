"use client";
import "./globals.css";
import { Prompt } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/footer";
import BootstrapScripts from "./components/BootstrapScripts";
import Navarbar from "./components/Navarbar";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const prompt = Prompt({
  subsets: ["thai", "latin"], // รองรับภาษาไทย
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <html lang="th">
      <body className={prompt.className}>
        <div className="container-fluid  px-0">
          <Navarbar />
          {children}
          <BootstrapScripts />
          <Footer />
        </div>
      </body>
    </html>
  );
}
