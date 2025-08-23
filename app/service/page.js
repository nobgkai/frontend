"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// ❌ เอาออก: import "bootstrap/dist/js/bootstrap.bundle.min.js";

const SERVICES = [
  // ... (รายการ SERVICES เดิมของคุณ ไม่ต้องแก้)
];

export default function Service() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-cubic" });

    // ✅ โหลด Bootstrap JS เฉพาะบน client
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch(() => {});
  }, []);

  const [openId, setOpenId] = useState(null);
  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
    // ✅ guard ป้องกัน SSR แม้โค้ดนี้รันเฉพาะตอนกดบน client อยู่แล้ว
    if (typeof document !== "undefined") {
      setTimeout(() => {
        const el = document.getElementById(`card-${id}`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    }
  };

  return (
    <main className="container-fluid px-0">
      {/* HERO */}
      <section className="mb-5" style={{ marginTop: 60 }}>
        <div
          id="heroCarousel"
          className="carousel slide hero shadow-sm overflow-hidden rounded-0"
          data-bs-ride="carousel"
          data-bs-interval="5200"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
            />
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="1"
            />
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/img/fruit/bg1.jpg"
                className="d-block w-100 hero-img"
                alt="ผลไม้เพื่อสุขภาพ"
                loading="eager"
              />
              <div className="hero-overlay" />
              <div className="carousel-caption caption-middle">
                <h1 className="fw-bold cap">“กินให้ฉลาด ไม่ใช่กินให้เยอะ”</h1>
                <p className="lead cap">
                  คุณภาพชนะปริมาณเสมอ — เลือกเวลา ปริมาณ
                  และชนิดผลไม้ให้พอดีกับร่างกาย แล้วผลลัพธ์ระยะยาวจะตามมาเอง
                </p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="/img/fruit/bg2.jpg"
                className="d-block w-100 hero-img"
                alt="คำปรึกษาแบบตัวต่อตัว"
                loading="lazy"
              />
              <div className="hero-overlay" />
              <div className="carousel-caption caption-middle">
                <h1 className="fw-bold cap">ความรู้สั้น ๆ ใช้ได้จริง</h1>
                <p className="lead cap">
                  ไฟเบอร์ช่วยชะลอการดูดซึมน้ำตาล — เลือก “ผลไม้ทั้งชิ้น”
                  แทนน้ำผลไม้ จะอิ่มนานและคุมพลังงานได้ดีกว่า
                </p>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" />
          </button>
        </div>
      </section>

      {/* SERVICE GRID */}
      <section id="services" className="container py-5">
        <div className="row g-4">
          {SERVICES.map((s, idx) => {
            const isOpen = openId === s.id;
            return (
              <div
                key={s.id}
                className="col-12 col-md-6 col-lg-4"
                data-aos="zoom-in"
                data-aos-delay={idx * 120}
                id={`card-${s.id}`}
              >
                <div className="p-4 border rounded-4 shadow-sm bg-light h-100 d-flex flex-column service-card">
                  <div className="mb-3">
                    <i className={`bi ${s.icon} ${s.color} fs-1`} />
                  </div>
                  <h4 className="mb-2">{s.title}</h4>
                  <p className="text-muted mb-3">{s.brief}</p>
                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-dark flex-fill"
                      onClick={() => toggle(s.id)}
                    >
                      {isOpen ? "ปิดรายละเอียด" : "อ่านเพิ่มเติม"}
                    </button>
                    <a href="#contact" className="btn btn-outline-secondary">
                      ติดต่อเรา
                    </a>
                  </div>
                  <div className={`expand-panel mt-3 ${isOpen ? "open" : ""}`}>
                    <ul className="text-start small mb-0">
                      {s.details.map((d, i) => (
                        <li key={i} className="mb-2">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* QUOTE */}
      <section className="text-center mt-5" data-aos="fade-up">
        <blockquote className="fs-4 fst-italic text-secondary">
          “กินให้ฉลาด ไม่ใช่กินให้เยอะ—คุณภาพชนะปริมาณเสมอ”
        </blockquote>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="mt-5 rounded-4 p-4 p-md-5 text-center cta-strip"
        data-aos="fade-up"
      >
        <h3 className="mb-3">🎥 วิดีโอแนะนำของเรา</h3>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="ratio ratio-16x9 shadow"
            style={{
              maxWidth: "720px",
              width: "100%",
              borderRadius: "16px",
              overflow: "hidden",
              margin: "0 auto",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/t9QA2-RnwzM"
              title="YouTube video"
              allowFullScreen
              style={{ border: 0 }}
            />
          </div>
        </div>

        <p className="mt-4 text-muted">
          ชมวิดีโอสั้น ๆ ที่เราเตรียมไว้
          เพื่อให้คุณเข้าใจการดูแลสุขภาพด้วยผลไม้ได้ง่ายขึ้น
          และพร้อมเริ่มต้นไปกับเราได้เลย
        </p>
      </section>

      {/* STYLE */}
      <style jsx>{`
        .hero {
          height: 80vh;
          min-height: 540px;
          position: relative;
        }
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: saturate(1.05);
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.35) 0%,
            rgba(0, 0, 0, 0.25) 45%,
            rgba(0, 0, 0, 0.45) 100%
          );
          pointer-events: none;
        }
        .carousel-caption {
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45);
        }
        .carousel-caption h1,
        .carousel-caption p {
          color: #fff;
        }
        .caption-middle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(100%, 1100px);
          padding: 0 2rem;
          text-align: center;
        }
        .carousel-caption .cap {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s, transform 0.6s;
        }
        .carousel-item.active .carousel-caption .cap {
          opacity: 1;
          transform: translateY(0);
        }
        .carousel-item.active .carousel-caption .cap:nth-child(1) {
          transition-delay: 0.12s;
        }
        .carousel-item.active .carousel-caption .cap:nth-child(2) {
          transition-delay: 0.26s;
        }

        .service-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }

        .expand-panel {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.4s ease;
        }
        .expand-panel.open {
          max-height: 420px;
          opacity: 1;
        }

        .cta-strip {
          background: radial-gradient(
              1200px 400px at 50% -20%,
              rgba(0, 200, 83, 0.09),
              transparent
            ),
            #fff;
          border: 1px solid #e9ecef;
        }

        @media (max-width: 768px) {
          .hero {
            height: calc(100vh - 60px);
            min-height: 460px;
          }
          .caption-middle {
            padding: 0 1rem;
            width: 100%;
          }
          .carousel-caption h1 {
            font-size: 1.6rem;
          }
          .carousel-caption p {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </main>
  );
}
