"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const SERVICES = [
  {
    id: "health",
    icon: "bi-heart-pulse-fill",
    color: "text-danger",
    title: "คำปรึกษาด้านสุขภาพจากผลไม้",
    brief:
      "แนะนำการเลือกผลไม้ให้เหมาะกับร่างกาย ไลฟ์สไตล์ และโรคประจำตัว เพื่อผลลัพธ์ที่ยั่งยืน",
    details: [
      "วางแผนการทานผลไม้รายสัปดาห์ (Macro/Micro nutrients ครบถ้วน)",
      "คู่มือจับคู่ผลไม้กับมื้ออาหาร: ก่อน/หลังออกกำลังกาย, ลดน้ำหนัก, คุมน้ำตาล",
      "หลีกเลี่ยงการทานซ้ำซ้อนของน้ำตาลผลไม้ (Fructose) แบบรู้ปริมาณ",
      "คำเตือน/ข้อควรระวังสำหรับผู้ป่วยเบาหวาน/ความดัน/โรคไต",
    ],
  },
  {
    id: "delivery",
    icon: "bi-truck",
    color: "text-success",
    title: "จัดส่งคำปรึกษา & คอร์สออนไลน์",
    brief:
      "ไม่ต้องเดินทาง เราส่งความรู้ให้ถึงที่ ทั้งเอกสาร วิดีโอสั้น และไลฟ์ Q&A รายสัปดาห์",
    details: [
      "สรุปเอกสาร PDF อินโฟกราฟิกอ่านง่าย อัปเดตทุกเดือน",
      "วิดีโอสั้น (5–10 นาที) เข้าใจเร็ว พร้อมตัวอย่างเมนูจริง",
      "ชั่วโมง Q&A แบบกลุ่มสัปดาห์ละครั้ง (Live/Recorded)",
      "แจ้งเตือนเป้าหมายรายวันผ่านอีเมลหรือโซเชียลที่คุณใช้",
    ],
  },
  {
    id: "family",
    icon: "bi-people-fill",
    color: "text-primary",
    title: "ดูแลแบบครบวงจร (รายบุคคล/ครอบครัว)",
    brief:
      "ที่ปรึกษาส่วนตัว ติดตามผลต่อเนื่อง ปรับแผนตามพฤติกรรมจริง ไม่ทิ้งระยะ",
    details: [
      "ประเมินพฤติกรรมการกินผลไม้ของสมาชิกในบ้านแบบรายคน",
      "ออกแบบแผนรวม: ตารางซื้อ/เตรียม/เก็บผลไม้ให้สดนาน",
      "เช็คลิสต์ติดตู้เย็น + สูตรน้ำผลไม้/สลัดที่ทำซ้ำได้",
      "รีวิวผลทุก 2 สัปดาห์พร้อมคำแนะนำปรับละเอียด",
    ],
  },
  {
    id: "articles",
    icon: "bi-journal-text",
    color: "text-warning",
    title: "บทความความรู้ & คลังเนื้อหา",
    brief:
      "อธิบายเชิงวิทยาศาสตร์ แต่เล่าให้เข้าใจง่าย ใช้ได้จริงในชีวิตประจำวัน",
    details: [
      "Fact-check อ้างอิงงานวิจัยสั้นๆ พร้อมสรุป Key Takeaways",
      "หัวข้อยอดนิยม: ไฟเบอร์ vs น้ำตาล, กินผลไม้ตอนไหนดีที่สุด",
      "Mini-guide เลือกผลไม้ตามฤดูกาล + เก็บรักษายังไงให้ไม่ช้ำ",
      "อัปเดตเทรนด์โภชนาการประจำเดือน (อ่าน 3 นาที)",
    ],
  },
  {
    id: "workshop",
    icon: "bi-mortarboard-fill",
    color: "text-info",
    title: "เวิร์กช็อป & อบรม",
    brief: "เรียนแบบลงมือทำ: ชิม เปรียบเทียบ ปรับเมนูจริง พร้อมแผนกลับไปทำต่อ",
    details: [
      "เวิร์กช็อป 90 นาที: จัดจานผลไม้สมดุล 3 รูปแบบ",
      "คลาสองค์กร/โรงเรียน พร้อมสไลด์และเอกสารประกอบ",
      "กิจกรรมชิมตาบอด (Blind tasting) ฝึกแยกรส/ความหวาน",
      "มอบหมายงานเล็ก ๆ 7 วัน + กลุ่มติดตามผล",
    ],
  },
];

export default function Service() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-cubic" });
  }, []);

  const [openId, setOpenId] = useState(null);
  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
    setTimeout(() => {
      const el = document.getElementById(`card-${id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  return (
    <main className="container-fluid px-0">
      {/* HERO: 2 สไลด์, ข้อความกึ่งกลาง, ไม่มีปุ่ม */}
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
            {/* Slide 1 */}
            <div className="carousel-item active">
              <img
                src="/img/fruit/bg1.jpg"
                className="d-block w-100 hero-img"
                alt="ผลไม้เพื่อสุขภาพ"
                loading="eager"
              />
              <div className="hero-overlay"></div>
              <div className="carousel-caption caption-middle">
                <h1 className="fw-bold cap">“กินให้ฉลาด ไม่ใช่กินให้เยอะ”</h1>
                <p className="lead cap">
                  คุณภาพชนะปริมาณเสมอ — เลือกเวลา ปริมาณ
                  และชนิดผลไม้ให้พอดีกับร่างกาย แล้วผลลัพธ์ระยะยาวจะตามมาเอง
                </p>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <img
                src="/img/fruit/bg2.jpg"
                className="d-block w-100 hero-img"
                alt="คำปรึกษาแบบตัวต่อตัว"
                loading="lazy"
              />
              <div className="hero-overlay"></div>
              <div className="carousel-caption caption-middle">
                <h1 className="fw-bold cap">ความรู้สั้น ๆ ใช้ได้จริง</h1>
                <p className="lead cap">
                  ไฟเบอร์ช่วยชะลอการดูดซึมน้ำตาล — เลือก “ผลไม้ทั้งชิ้น”
                  แทนน้ำผลไม้ จะอิ่มนานและคุมพลังงานได้ดีกว่า
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
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
                    <i className={`bi ${s.icon} ${s.color} fs-1`}></i>
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

        {/* วิดีโอกึ่งกลาง + ขอบมน */}
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
              style={{ border: "0" }}
            ></iframe>
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
        /* HERO เต็ม viewport (หัก navbar 60px) */
        .hero {
          height: 80vh;
          min-height: 540px;
          position: relative;
        }
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center; /* 5092x2000 กลางพอดี */
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

        /* Bootstrap ใส่ bottom/left/right ให้ .carousel-caption มาเอง
           เรา override ใน .caption-middle เพื่อให้อยู่กึ่งกลางจริง ๆ */
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
          right: auto;
          bottom: auto; /* kill bottom ของ Bootstrap */
          transform: translate(-50%, -50%);
          width: min(100%, 1100px);
          padding: 0 2rem;
          text-align: center;
        }

        /* เอฟเฟกต์ข้อความค่อย ๆ โผล่ */
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

        /* การ์ดบริการ */
        .service-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }

        /* แผงรายละเอียด */
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

        /* CTA */
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
