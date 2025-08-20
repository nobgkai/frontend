"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import "./navar.css";

// ✅ ฟังก์ชันอ่าน token จาก localStorage/sessionStorage
function readToken() {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("token") || sessionStorage.getItem("token") || null
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // เส้นทางปัจจุบัน
  const [token, setToken] = useState(null);

  // ✅ โหลด token เมื่อโหลดหน้า และเมื่อเปลี่ยนเส้นทาง
  useEffect(() => {
    setToken(readToken());
  }, [pathname]);

  // ✅ รองรับกรณีเปลี่ยน token จากอีกแท็บ
  useEffect(() => {
    const onStorage = () => setToken(readToken());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setToken(null);
    router.push("/login1");
  }, [router]);

  const handleSearch = (e) => {
    e.preventDefault(); // ป้องกันรีเฟรช
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand fw-bold text-white">
          ผลไม้บ้าน
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item">
              <Link href="/" className="nav-link custom-nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link custom-nav-link">
                About
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle custom-nav-link"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => e.preventDefault()}
              >
                Recommend
              </a>
              <ul className="dropdown-menu custom-dropdown">
                <li>
                  <Link href="/service" className="dropdown-item">
                    Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="dropdown-item">
                    Contact
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown-item"
                    onClick={(e) => e.preventDefault()}
                  >
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="d-flex align-item-center ms-auto grap-2">
            {/* 🔎 Search */}
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                name="q"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn custom-btn" type="submit">
                Search
              </button>
            </form>

            {/* 🔐 Auth */}
            {token ? (
              <button
                className="btn btn-danger ms-lg-3  w-lg-auto mt-3 mt-lg-0"
                type="button"
                onClick={handleSignOut}
              >
                SignOut
              </button>
            ) : (
              <Link
                href="/login1"
                className="btn custom-btn-login ms-lg-3  w-lg-auto mt-3 mt-lg-0"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
