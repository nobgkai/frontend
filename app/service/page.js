"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// ❌ อย่า import bootstrap JS ตรง ๆ ที่ top-level

const SERVICES = [
  // ── ที่ปรึกษาการ "กินผลไม้"
  {
    id: "profile-nutrition",
    icon: "bi-heart-pulse-fill",
    color: "text-danger",
    title: "วิเคราะห์โภชนาการส่วนบุคคล",
    brief:
      "ดูภาพรวมสุขภาพ ไลฟ์สไตล์ และความต้องการเฉพาะของคุณ เพื่อวางแผนกินผลไม้ที่ทำได้จริง",
    details: [
      "เก็บข้อมูล: น้ำหนัก, ความดัน, น้ำตาล, การนอน, การออกกำลังกาย",
      "เช็กความชอบรสชาติ/เนื้อสัมผัส เพื่อปรับเมนูที่ยั่งยืน",
      "ตั้งเป้าหมาย 4–8 สัปดาห์: พลังงาน/รอบเอว/ความฟิต",
      "ทำ checklist นิสัยเล็ก ๆ ที่เริ่มได้ทันที (habit cues)",
    ],
  },
  {
    id: "portion-timing",
    icon: "bi-egg-fried",
    color: "text-warning",
    title: "กำหนด Portion & Timing รายวัน",
    brief:
      "รู้ ‘ปริมาณที่พอดี’ และเวลาเหมาะสม เพื่อคุมพลังงานและน้ำตาลให้สมดุล",
    details: [
      "portion แนะนำต่อมื้อ (≈80–120 กรัม/ชนิด ปรับตามชนิดผลไม้)",
      "เวลา: เช้า/ก่อน-หลังออกกำลังกาย/ว่างบ่าย/ก่อนนอน (ย่อยง่าย)",
      "คู่มือสลับชนิด: ถ้าไม่มีผลไม้ที่วางแผน ไว้มีตัวแทนอะไรบ้าง",
      "ตัวอย่างเมนู 7 วัน (ผลไม้ + โยเกิร์ต/ธัญพืช/ถั่ว) ทำซ้ำได้",
    ],
  },
  {
    id: "sugar-fiber",
    icon: "bi-droplet-half",
    color: "text-info",
    title: "คุมน้ำตาล & เสริมไฟเบอร์",
    brief:
      "เหมาะกับคนคุมน้ำหนัก/เบาหวาน เน้นอิ่มนาน น้ำตาลไม่พุ่ง และระบบขับถ่ายดี",
    details: [
      "เลือก ‘ผลไม้ทั้งชิ้น’ มากกว่า ‘น้ำผลไม้’ เพื่อลด GI",
      "จับคู่โปรตีน/ไขมันดี (ถั่ว/โยเกิร์ต) ช่วยชะลอน้ำตาล",
      "เทคนิค portion กับกล้วย/องุ่น/ทุเรียน (คุมชิ้น/คำ)",
      "สังเกตสัญญาณน้ำตาลเหวี่ยง แล้วปรับเวลาให้เหมาะ",
    ],
  },
  {
    id: "special-groups",
    icon: "bi-people-fill",
    color: "text-primary",
    title: "คำแนะนำเฉพาะกลุ่ม",
    brief: "ออกแบบให้เหมาะกับเด็ก ผู้สูงอายุ นักกีฬา และคนมีโรคประจำตัว",
    details: [
      "เด็ก: เน้นหลากสี ฝึกการเคี้ยว/หยิบ ช่วยสร้างนิสัยที่ดี",
      "ผู้สูงอายุ: เนื้อนุ่ม ย่อยง่าย และช่วยเรื่องขับถ่าย",
      "นักกีฬา: pre/post-workout ที่สมดุลพลังงานและเกลือแร่",
      "ผู้มีโรคประจำตัว: ปรับชนิด/ปริมาณ/เวลาอย่างปลอดภัย",
    ],
  },
  {
    id: "buy-store",
    icon: "bi-basket2-fill",
    color: "text-success",
    title: "เลือกซื้อ & เก็บรักษาอย่างมืออาชีพ",
    brief: "ประหยัดขึ้น เก็บได้นานขึ้น รสชาติยังดี พร้อมกินทั้งสัปดาห์",
    details: [
      "เช็กลักษณะผลสุก/ดิบ เลือกให้ตรงช่วงกินจริง",
      "วิธีล้าง/ปอก/หั่นที่ปลอดภัยและไม่ดำ",
      "จัดกล่อง meal-prep 3–4 วัน (ไม่เละ ไม่อมน้ำ)",
      "แช่แข็ง (freeze) ไว้ทำสมูทตี้/โยเกิร์ตโบวล์",
    ],
  },

  // ── ที่ปรึกษาการ "ปลูกผลไม้"
  {
    id: "variety-climate",
    icon: "bi-compass",
    color: "text-secondary",
    title: "เลือกพันธุ์ให้เข้ากับพื้นที่ & อากาศ",
    brief: "เริ่มให้ถูกทาง เลือกพันธุ์ที่เติบโตดีในสภาพแวดล้อมของคุณ",
    details: [
      "ประเมินแสง: เต็มวัน/ครึ่งวัน/รำไร แล้วคัดชนิดที่เหมาะ",
      "ภูมิอากาศ: ร้อนชื้น vs ครึ่งหนาว เลือกพันธุ์ที่รอดจริง",
      "พื้นที่จำกัด: พุ่มเล็ก/กิ่งน้อย ปลูกกระถาง/ระเบียงได้",
      "แผนการขยายพันธุ์แบบง่าย (ตอน/ปักชำ) สำหรับมือใหม่",
    ],
  },
  {
    id: "soil-ph",
    icon: "bi-bezier2",
    color: "text-dark",
    title: "ดิน ปุ๋ย และค่า pH",
    brief: "ตั้งรากฐานให้ดี ต้นจะแข็งแรงและให้ผลต่อเนื่อง",
    details: [
      "สูตรดินร่วน: ดิน 50% + คอมโพสต์/ปุ๋ยคอก 30% + วัสดุโปร่ง 20%",
      "ค่า pH เป้าหมาย 5.5–6.5 (ส่วนใหญ่) และวิธีปรับอย่างปลอดภัย",
      "ยกระดับระบายน้ำ: ยกร่อง/ชั้นกรวด/รูระบายกระถาง",
      "คลุมดิน (mulch) ลดระเหย เก็บความชื้นได้นาน",
    ],
  },
  {
    id: "water-nutrients",
    icon: "bi-droplet",
    color: "text-primary",
    title: "น้ำ & สารอาหารแบบยั่งยืน",
    brief: "ดูแลง่าย ไม่เปลืองน้ำ เน้นระบบที่เข้ากับชีวิตจริง",
    details: [
      "ให้น้ำเช้าเป็นหลัก เย็นเฉพาะหน้าแล้ง/ลมแรง (เลี่ยงแฉะ)",
      "คอมโพสต์/ปุ๋ยอินทรีย์ เดือนละครั้ง + น้ำหมักชีวภาพเสริม",
      "ช่วงติดดอก/ติดผล เพิ่มโพแทสเซียมจากวัสดุอินทรีย์",
      "ทำตารางรดน้ำ/ใส่ปุ๋ยแบบสั้น ๆ ติดไว้ที่แปลง",
    ],
  },
  {
    id: "pruning-fruiting",
    icon: "bi-scissors",
    color: "text-warning",
    title: "ตัดแต่งกิ่ง & กระตุ้นออกดอกติดผล",
    brief: "จัดทรงพุ่มรับแสงทั่วถึง ลดโรค และได้ผลผลิตดีขึ้น",
    details: [
      "ตัดกิ่งแห้ง/กิ่งไขว้ ให้พุ่มโปร่ง อากาศถ่ายเท",
      "จัดทรงพุ่มถ้วย/ทรง Y รับแสงได้ทั่ว",
      "พักต้นหลังเก็บเกี่ยว แล้วกระตุ้นรอบใหม่อย่างถูกจังหวะ",
      "ติดค้ำ/ผูกกิ่ง ป้องกันฉีกขาดช่วงผลดก",
    ],
  },
  {
    id: "ipm",
    icon: "bi-bug",
    color: "text-danger",
    title: "ป้องกันโรค-แมลงแบบ IPM",
    brief: "ปลอดภัยต่อคนและสิ่งแวดล้อม จัดการเฉพาะจุดเมื่อจำเป็น",
    details: [
      "ป้องกันก่อนเกิด: ความโปร่งของพุ่ม สุขอนามัยแปลง คลุมดิน",
      "สำรวจอาการ: ใบด่าง/รา/เพลี้ย → ระบุสาเหตุให้ถูก",
      "ใช้ชีวภัณฑ์/สมุนไพร (เช่น บิวเวอเรีย, น้ำส้มควันไม้) อย่างมีหลักการ",
      "บันทึกอาการและการแก้ไข เพื่อใช้ปรับแผนรอบหน้า",
    ],
  },
  {
    id: "calendar",
    icon: "bi-calendar4-week",
    color: "text-success",
    title: "ปฏิทินงานตลอดปี & ตัวอย่างชนิดยอดฮิต",
    brief: "รู้ช่วงเพาะ/ย้าย/ให้ปุ๋ย/เก็บเกี่ยว แบบ step-by-step",
    details: [
      "ปลายฝน–ต้นหนาว: เพาะ/ย้าย/ปรับดินรอบโคน",
      "ฤดูหนาว: ตัดแต่งทรงพุ่ม เตรียมดินรอบใหม่",
      "ปลายหนาว–ต้นร้อน: กระตุ้นดอก/ติดผล ติดค้ำ",
      "หน้าฝน: ระบายน้ำ ป้องกันเชื้อรา เสริมโพแทสเซียม",
    ],
  },
];

export default function Service() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-cubic" });
    // ✅ โหลด Bootstrap JS เฉพาะบน client (ไม่พัง SSR)
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch(() => {});
  }, []);

  const [openId, setOpenId] = useState(null);
  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
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
                data-aos-delay={idx * 100}
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
        <h3 className="mb-3">นัดคุยเพื่อเริ่มแผนของคุณ</h3>
        <p className="text-muted mb-4">
          บอกเป้าหมายคร่าว ๆ มาได้เลย
          เดี๋ยวเราช่วยวางเส้นทางให้เหมาะกับเวลาและไลฟ์สไตล์ของคุณ
        </p>
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
        <div className="d-flex justify-content-center gap-2 flex-wrap mt-4">
          <a
            className="btn btn-dark"
            href="https://line.me/ti/p/yourlineid"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-chat-dots me-2"></i>คุยทาง LINE
          </a>
          <a
            className="btn btn-outline-secondary"
            href="mailto:you@example.com"
          >
            <i className="bi bi-envelope me-2"></i>อีเมลหาเรา
          </a>
        </div>
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
