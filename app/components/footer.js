"use client";
import Link from "next/link";
import { useRef, useCallback } from "react";

export default function Footer() {
  const footerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = footerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--x", x + "%");
    el.style.setProperty("--y", y + "%");
  }, []);

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="fruit-footer border-top mt-5"
      data-aos="fade-up"
    >
      <div className="container py-5">
        <div className="row gy-4">
          {/* Brand + social */}
          <div className="col-12 col-md-5">
            <Link
              href="/"
              className="brand d-inline-flex align-items-center gap-2 text-decoration-none"
              aria-label="หน้าแรก ผลไม้บ้าน"
            >
              <span className="fruit">🍊</span>
              <span className="fw-bold">ผลไม้บ้าน</span>
            </Link>
            <p className="mt-3 text-body-secondary small">
              เว็บผลไม้โทนมินิมอล ความรู้โภชนาการ เคล็ดลับเลือกผลไม้
              และบริการของเรา
            </p>

            <div
              className="social d-flex gap-3 mt-2"
              data-aos="fade-up"
              data-aos-delay="120"
            >
              <a
                href="#"
                className="icon bi bi-facebook"
                aria-label="Facebook"
              ></a>
              <a
                href="#"
                className="icon bi bi-instagram"
                aria-label="Instagram"
              ></a>
              <a href="#" className="icon bi bi-line" aria-label="LINE"></a>
            </div>
          </div>

          {/* Site menu */}
          <div className="col-6 col-md-3">
            <h6 className="heading">เมนู</h6>
            <ul className="list-unstyled">
              <li>
                <Link href="/" className="nav-link p-0 link-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="nav-link p-0 link-hover">
                  About
                </Link>
              </li>
              <li>
                <Link href="/service" className="nav-link p-0 link-hover">
                  Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="nav-link p-0 link-hover">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter + fruit chips */}
          <div className="col-12 col-md-4">
            <h6 className="heading">ติดตามข่าวผลไม้</h6>
            <form
              className="newsletter"
              onSubmit={(e) => e.preventDefault()}
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <input
                className="form-control form-control-sm"
                type="email"
                placeholder="อีเมลของคุณ"
              />
              <button className="btn btn-dark btn-sm w-100 mt-2">
                Subscribe
              </button>
            </form>

            <div className="fruit-chips mt-3 d-flex gap-2" aria-hidden="true">
              <span className="chip" title="ส้ม">
                🍊
              </span>
              <span className="chip" title="กล้วย">
                🍌
              </span>
              <span className="chip" title="องุ่น">
                🍇
              </span>
              <span className="chip" title="แอปเปิล">
                🍎
              </span>
            </div>
          </div>
        </div>

        <hr className="my-4 opacity-10" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center small">
          <p className="mb-0 text-body-secondary">
            © {new Date().getFullYear()} ผลไม้บ้าน
          </p>
          {/* ถ้าต้องการตัด Privacy/Terms ตรงนี้ด้วย บอกได้ เดี๋ยวผมลบให้ */}
          <ul className="nav small">
            <li className="nav-item">
              <Link className="nav-link px-2 link-hover" href="/privacy">
                Privacy
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 link-hover" href="/terms">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .fruit-footer {
          position: relative;
          overflow: hidden;
          background: var(--bs-body-bg);
          --x: 50%;
          --y: 0%;
          background-image: radial-gradient(
            140px 70px at var(--x) var(--y),
            rgba(255, 170, 0, 0.12),
            transparent 70%
          );
        }
        .fruit-footer::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            #ffd166,
            #ef476f,
            #06d6a0,
            #118ab2
          );
          background-size: 200% 100%;
          animation: slide 8s linear infinite;
          opacity: 0.65;
        }
        @keyframes slide {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        .brand {
          font-size: 1.25rem;
          color: var(--bs-emphasis-color);
        }
        .brand .fruit {
          transition: transform 0.25s ease;
          filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.15));
        }
        .brand:hover .fruit {
          transform: rotate(-8deg) scale(1.08);
        }
        .heading {
          font-weight: 700;
          letter-spacing: 0.3px;
          margin-bottom: 0.5rem;
        }
        .link-hover {
          color: var(--bs-body-color);
          text-decoration: none;
          background-image: linear-gradient(currentColor, currentColor);
          background-position: 0 100%;
          background-repeat: no-repeat;
          background-size: 0% 1px;
          transition: background-size 0.22s ease, color 0.22s ease,
            transform 0.22s ease;
        }
        .link-hover:hover {
          color: var(--bs-emphasis-color);
          background-size: 100% 1px;
          transform: translateY(-1px);
        }
        .icon {
          font-size: 1.25rem;
          opacity: 0.85;
          transition: transform 0.18s ease, opacity 0.18s ease;
        }
        .icon:hover {
          transform: translateY(-2px) scale(1.06);
          opacity: 1;
        }
        .newsletter :global(.form-control) {
          border-radius: 14px;
          backdrop-filter: blur(6px);
        }
        .newsletter :global(.btn) {
          border-radius: 12px;
        }
        .chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.04);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          user-select: none;
        }
        .chip:hover {
          transform: translateY(-3px) rotate(-4deg);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </footer>
  );
}
