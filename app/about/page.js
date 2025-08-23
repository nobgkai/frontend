"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // ❌ ตัด bootstrap.bundle ออก

export default function About() {
  const [copied, setCopied] = useState(false);
  const [showSkills, setShowSkills] = useState(false); // toggle ทักษะโปรแกรม
  const [showCodeSkills, setShowCodeSkills] = useState(false); // toggle ทักษะโค้ด

  // state สำหรับ “รายละเอียด” (แทน Bootstrap Collapse)
  const [openDesign, setOpenDesign] = useState({});
  const [openCode, setOpenCode] = useState({});

  const toggleDesign = (id) =>
    setOpenDesign((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleCode = (id) =>
    setOpenCode((prev) => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out" });
  }, []);

  const lineId = "yourlineid";
  const handleCopyLine = async () => {
    try {
      await navigator.clipboard.writeText(lineId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      alert("คัดลอกไม่สำเร็จ ลองอีกครั้งนะ");
    }
  };

  // ทักษะโปรแกรม + โลโก้ + ระดับ
  const skills = [
    {
      id: "canva",
      name: "Canva",
      img: "/img/service/2.png",
      levelText: "ดีมาก",
      level: 90,
      points: [
        "ออกแบบโพสต์/สตอรี่ เทมเพลต พร้อมปรับแบรนด์",
        "จัดวางตัวอักษรให้อ่านง่ายโทนมินิมอล",
        "ส่งออกไฟล์ Web / Social คุณภาพเหมาะสม",
      ],
      cls: "canva",
    },
    {
      id: "photoshop",
      name: "Adobe Photoshop",
      img: "/img/service/1.png",
      levelText: "ดี",
      level: 80,
      points: [
        "ปรับแสง/สี รีทัช ลบวัตถุ พื้นหลัง",
        "ทำ Mockup / Composite เบื้องต้น",
        "เตรียมภาพสำหรับเว็บให้ไฟล์เล็กและคม",
      ],
      cls: "photoshop",
    },
    {
      id: "illustrator",
      name: "Adobe Illustrator",
      img: "/img/service/3.jpg",
      levelText: "ดี",
      level: 78,
      points: [
        "วาดโลโก้/ไอคอน เวกเตอร์คมชัด",
        "จัดเลย์เอาต์โปสเตอร์/โบรชัวร์แบบมินิมอล",
        "ตั้งค่าเส้น/ฟอนต์ให้สม่ำเสมอ",
      ],
      cls: "illustrator",
    },
    {
      id: "premiere",
      name: "Adobe Premiere Pro",
      img: "/img/service/4.png",
      levelText: "กำลังพัฒนา",
      level: 65,
      points: [
        "ตัดต่อคลิปสั้น / Vlog พื้นฐาน",
        "ใส่ซับ/ทรานซิชันให้ดูสะอาด",
        "Export โปรไฟล์เหมาะกับโซเชียล",
      ],
      cls: "premiere",
    },
  ];

  // ทักษะการเขียนโค้ด + โลโก้ + ระดับ
  const codeSkills = [
    {
      id: "html",
      name: "HTML5",
      img: "/img/service/html.png",
      levelText: "เชี่ยวชาญ",
      level: 95,
      points: ["Semantic/SEO", "โครงสร้างสะอาด", "รองรับ Accessibility"],
      cls: "html",
    },
    {
      id: "css",
      name: "CSS3",
      img: "/img/service/css.png",
      levelText: "ดี",
      level: 68,
      points: ["Flexbox/Grid", "Responsive", "Animation/Transition"],
      cls: "css",
    },
    {
      id: "react",
      name: "React",
      img: "/img/service/react.png",
      levelText: "พื้นฐาน",
      level: 60,
      points: ["Hooks", "Component Design", "State/Props"],
      cls: "react",
    },
    {
      id: "next",
      name: "Next.js",
      img: "/img/service/next.png",
      levelText: "ดี",
      level: 75,
      points: ["App Router", "SSR/SSG", "API Routes"],
      cls: "next",
    },
    {
      id: "php",
      name: "PHP",
      img: "/img/service/php.png",
      levelText: "ดี",
      level: 70,
      points: ["CRUD", "เชื่อม MySQL", "Auth/Login"],
      cls: "php",
    },
  ];

  return (
    <main className="container py-5 ">
      {/* BG WAVES */}
      <div className="bg-waves" aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            d="M0,64L48,90.7C96,117,192,171,288,186.7C384,203,480,181,576,176C672,171,768,181,864,176C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L0,0Z"
            fill="#f6f6f6"
          />
        </svg>
      </div>

      {/* HERO */}
      <section className="text-center mb-5" style={{ marginTop: 70 }}>
        <div className="avatar-wrap" data-aos="fade-down">
          <span className="avatar-glow" aria-hidden="true" />
          <div className="avatar">
            <img
              src="/img/contact/1.png"
              alt="Profile"
              className="avatar-img"
            />
          </div>
        </div>

        <h1 className="mt-4 mb-1 fw-semibold fancy-title" data-aos="fade-up">
          นาย ไกรวิชญ์ อ้นเกษ
        </h1>
        <p className="text-muted" data-aos="fade-up" data-aos-delay="100">
          รหัสนักศึกษา 002 · นักศึกษาสายเทคโนโลยีสารสนเทศ
        </p>

        <p
          className="mx-auto mt-3 text-secondary"
          style={{ maxWidth: 720 }}
          data-aos="fade-up"
          data-aos-delay="150"
        >
          คนรักงานออกแบบและพัฒนาเว็บแบบมินิมอล เน้นอ่านง่าย โหลดไว ใช้งานสะดวก
          สนใจ Front-End (React/Next.js), UI ที่เข้ากับผู้ใช้จริง
          และการดูแลระบบพื้นฐาน ทำงานเป็นทีม รับผิดชอบ ส่งงานตรงเวลา
          และชอบทดลองสิ่งใหม่ ๆ อยู่เสมอ
        </p>
      </section>

      {/* INFO GRID */}
      <section className="row g-4 justify-content-center mb-5">
        <div className="col-md-5" data-aos="fade-up">
          <div className="card glass-card rounded-4 h-100">
            <div className="card-body p-4">
              <h5 className="fw-semibold mb-3 with-underline">ข้อมูลสรุป</h5>
              <ul className="list-unstyled small m-0 text-secondary">
                <li className="mb-2">
                  • ตำแหน่งถนัด: Front-End Developer / UI Designer
                </li>
                <li className="mb-2">
                  • ความสามารถ: HTML, CSS, JavaScript, React, Next.js, Bootstrap
                </li>
                <li className="mb-2">
                  • เครื่องมือ: VS Code, Figma, Git, Adobe Illustrator
                </li>
                <li className="mb-2">
                  • สไตล์งาน: เรียบ โล่ง ใช้สี 2–3 โทน คุม spacing ดี
                </li>
                <li className="mb-2">
                  • เป้าหมาย: เว็บใช้ง่าย ปลอดภัย และขยายต่อได้
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-5" data-aos="fade-up" data-aos-delay="100">
          <div className="card glass-card rounded-4 h-100">
            <div className="card-body p-4">
              <h5 className="fw-semibold mb-3 with-underline">
                ประสบการณ์/ผลงานที่เกี่ยวข้อง
              </h5>
              <ul className="list-unstyled small m-0 text-secondary">
                <li className="mb-2">
                  • เว็บแนะนำผลไม้ + ระบบบทความ (Next.js + Bootstrap + AOS)
                </li>
                <li className="mb-2">
                  • หน้า Admin จัดการผู้ใช้ (CRUD, แยก API, fetch)
                </li>
                <li className="mb-2">
                  • ออกแบบ UI เพจขายสินค้าโทนมินิมอล (Figma → Next.js)
                </li>
                <li className="mb-2">
                  • ทำฟอนต์/ไอคอนให้กลมกลืน อ่านง่าย เข้าถึงได้
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS (Design Tools) */}
      <section className="mb-5" data-aos="fade-up">
        <div className="card glass-card rounded-4">
          <div className="card-body p-4">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <h5 className="fw-semibold m-0 with-underline">ทักษะโปรแกรม</h5>
              <button
                className="btn btn-sm btn-dark px-3"
                onClick={() => setShowSkills((s) => !s)}
                aria-expanded={showSkills}
                aria-controls="skills-grid"
              >
                {showSkills ? "ซ่อนทักษะ" : "ดูทักษะ"}
              </button>
            </div>

            <div
              id="skills-grid"
              className={`skills-grid ${showSkills ? "expanded" : "collapsed"}`}
            >
              {skills.map((s, idx) => (
                <div
                  key={s.id}
                  className={`skill-card card rounded-4 p-3 ${s.cls}`}
                  data-aos="zoom-in"
                  data-aos-delay={idx * 80}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="skill-logo">
                      <img src={s.img} alt={`${s.name} logo`} />
                    </div>
                    <div>
                      <div className="fw-semibold">{s.name}</div>
                      <div className="text-secondary small">{s.levelText}</div>
                    </div>
                  </div>

                  <div className="progress mt-3" style={{ height: 6 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${s.level}%` }}
                      aria-valuenow={s.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>

                  <button
                    className="btn btn-sm btn-outline-dark mt-3"
                    onClick={() => toggleDesign(s.id)}
                    aria-expanded={!!openDesign[s.id]}
                    aria-controls={`skill-${s.id}`}
                  >
                    รายละเอียด
                  </button>
                  <div
                    id={`skill-${s.id}`}
                    className={`details mt-3 ${openDesign[s.id] ? "show" : ""}`}
                  >
                    <ul className="small text-secondary m-0 ps-3">
                      {s.points.map((p, i) => (
                        <li key={i} className="mb-1">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CODE SKILLS */}
      <section className="mb-5" data-aos="fade-up">
        <div className="card glass-card rounded-4">
          <div className="card-body p-4">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <h5 className="fw-semibold m-0 with-underline">
                ทักษะการเขียนโค้ด
              </h5>
              <button
                className="btn btn-sm btn-dark px-3"
                onClick={() => setShowCodeSkills((s) => !s)}
                aria-expanded={showCodeSkills}
                aria-controls="code-skills-grid"
              >
                {showCodeSkills ? "ซ่อนทักษะ" : "ดูทักษะ"}
              </button>
            </div>

            <div
              id="code-skills-grid"
              className={`skills-grid ${
                showCodeSkills ? "expanded" : "collapsed"
              }`}
            >
              {codeSkills.map((s, idx) => (
                <div
                  key={s.id}
                  className={`skill-card card rounded-4 p-3 ${s.cls}`}
                  data-aos="zoom-in"
                  data-aos-delay={idx * 80}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="skill-logo">
                      <img src={s.img} alt={`${s.name} logo`} />
                    </div>
                    <div>
                      <div className="fw-semibold">{s.name}</div>
                      <div className="text-secondary small">{s.levelText}</div>
                    </div>
                  </div>

                  <div className="progress mt-3" style={{ height: 6 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${s.level}%` }}
                      aria-valuenow={s.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>

                  <button
                    className="btn btn-sm btn-outline-dark mt-3"
                    onClick={() => toggleCode(s.id)}
                    aria-expanded={!!openCode[s.id]}
                    aria-controls={`code-skill-${s.id}`}
                  >
                    รายละเอียด
                  </button>
                  <div
                    id={`code-skill-${s.id}`}
                    className={`details mt-3 ${openCode[s.id] ? "show" : ""}`}
                  >
                    <ul className="small text-secondary m-0 ps-3">
                      {s.points.map((p, i) => (
                        <li key={i} className="mb-1">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CHANNELS */}
      <h3 className="text-center fw-semibold mb-4 fancy-sub" data-aos="fade-up">
        ช่องทางการติดต่อ
      </h3>

      <section className="row g-4 justify-content-center mb-5">
        {/* Instagram */}
        <div className="col-10 col-md-3" data-aos="zoom-in">
          <a
            className="text-decoration-none"
            href="https://www.instagram.com/kaivitongat/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ไปที่ Instagram"
          >
            <div className="card contact-card rounded-4 h-100 brand-ig-glow">
              <div className="card-body p-4 text-center">
                <i className="bi bi-instagram fs-1 mb-2 brand-ig" />
                <h6 className="mb-1 text-dark">Instagram</h6>
                <p className="text-secondary small m-0">@NobgKai</p>
              </div>
            </div>
          </a>
        </div>

        {/* Facebook */}
        <div
          className="col-10 col-md-3"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <a
            className="text-decoration-none"
            href="https://www.facebook.com/Nobgkai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ไปที่ Facebook"
          >
            <div className="card contact-card rounded-4 h-100 brand-fb-glow">
              <div className="card-body p-4 text-center">
                <i className="bi bi-facebook fs-1 mb-2 brand-fb" />
                <h6 className="mb-1 text-dark">Facebook</h6>
                <p className="text-secondary small m-0">คนธรรมดา หมี</p>
              </div>
            </div>
          </a>
        </div>

        {/* LINE */}
        <div
          className="col-10 col-md-3"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div className="card contact-card rounded-4 h-100 brand-line-glow">
            <div className="card-body p-4 text-center">
              <i className="bi bi-chat-dots fs-1 mb-2 brand-line" />
              <h6 className="mb-1 text-dark">LINE</h6>
              <p className="text-secondary small m-0">Line ID: {lineId}</p>
              <div className="d-flex justify-content-center gap-2 mt-3">
                <a
                  className="btn btn-sm btn-outline-dark px-3"
                  href={`https://line.me/ti/p/${lineId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  เปิด LINE
                </a>
                <button
                  className="btn btn-sm btn-dark px-3"
                  onClick={handleCopyLine}
                >
                  คัดลอก ID
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="mb-5" data-aos="fade-up">
        <div className="card glass-card rounded-4">
          <div className="card-body p-0">
            <div className="p-4 pb-0 d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div>
                <h5 className="fw-semibold mb-1 with-underline">แผนที่</h5>
                <p className="text-secondary small mb-0">
                  วิทยาลัยเทคนิคเชียงใหม่ (Chiang Mai Technical College)
                </p>
              </div>
              <a
                className="btn btn-sm btn-dark px-3"
                href="https://www.google.com/maps/place/Chiang+Mai+Technical+College"
                target="_blank"
                rel="noopener noreferrer"
              >
                เปิดเส้นทางใน Google Maps
              </a>
            </div>

            <div className="map-wrap rounded-bottom-4">
              <iframe
                title="Chiang Mai Technical College Map"
                src="https://www.google.com/maps?q=Chiang%20Mai%20Technical%20College&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Toast copy */}
      <div
        className={`copy-toast ${copied ? "show" : ""}`}
        role="status"
        aria-live="polite"
      >
        คัดลอก Line ID แล้ว
      </div>

      {/* FOOT NOTE */}
      <p className="text-center text-muted small" data-aos="fade">
        อัปเดตล่าสุด · พร้อมร่วมงาน/โปรเจ็กต์ที่ท้าทาย ติดต่อได้ทุกช่องทางด้านบน
      </p>

      {/* Styles */}
      <style jsx global>{`
        :root {
          --brand-ig: #e4405f;
          --brand-fb: #1877f2;
          --brand-line: #06c755;
          --canva: #00c4cc;
          --ps: #31a8ff;
          --ai: #ff9a00;
          --pr: #9999ff;
        }

        /* BG: gradient + noise บาง ๆ */
        body {
          background: radial-gradient(
              1200px 600px at 10% -10%,
              #ffffff 0%,
              #fafafa 50%,
              #f7f7f7 100%
            ),
            linear-gradient(135deg, #fafafa 0%, #f7f7f7 100%);
          background-attachment: fixed;
        }
        main::before {
          content: "";
          position: fixed;
          inset: 0;
          background-image: radial-gradient(#eaeaea 0.6px, transparent 0.6px);
          background-size: 18px 18px;
          opacity: 0.35;
          z-index: -2;
          pointer-events: none;
        }
        .bg-waves {
          position: absolute;
          inset: 0 auto auto 0;
          width: 100%;
          height: 180px;
          z-index: -1;
          opacity: 0.7;
          pointer-events: none;
        }
        .bg-waves svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Avatar + glow */
        .avatar-wrap {
          position: relative;
          width: 210px;
          height: 210px;
          margin-inline: auto;
        }
        .avatar-glow {
          position: absolute;
          inset: -12px -12px 0 -12px;
          height: 220px;
          border-radius: 999px;
          filter: blur(24px);
          opacity: 0.35;
          background: conic-gradient(
            from 180deg at 50% 50%,
            #fff,
            #eaeaea,
            #f3f3f3,
            #fff
          );
          animation: slow-pan 8s linear infinite;
        }
        .avatar {
          position: relative;
          width: 200px;
          height: 200px;
          border-radius: 999px;
          border: 3px solid #fff;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          background: #fff;
          margin: 0 auto;
        }
        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        @keyframes slow-pan {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Titles */
        .fancy-title {
          letter-spacing: 0.2px;
        }
        .fancy-sub {
          letter-spacing: 0.2px;
        }
        .with-underline {
          position: relative;
          display: inline-block;
          padding-bottom: 0.25rem;
        }
        .with-underline::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #e9e9e9, #dcdcdc, #e9e9e9);
          border-radius: 999px;
          transform-origin: left;
          transform: scaleX(0.6);
          transition: transform 0.4s ease;
        }
        .with-underline:hover::after {
          transform: scaleX(1);
        }

        /* Cards */
        .glass-card {
          border: 0;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: saturate(140%) blur(6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
        }
        .contact-card {
          border: 0;
          background: #fff;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
          transition: transform 0.15s ease, box-shadow 0.15s ease,
            outline-color 0.15s ease;
          outline: 1px solid rgba(0, 0, 0, 0.04);
        }
        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
        }

        /* Brand colors + glow */
        .brand-fb {
          color: var(--brand-fb);
        }
        .brand-line {
          color: var(--brand-line);
        }
        .brand-ig {
          color: var(--brand-ig);
        }
        .brand-fb-glow:hover {
          outline-color: color-mix(in srgb, var(--brand-fb) 24%, transparent);
        }
        .brand-line-glow:hover {
          outline-color: color-mix(in srgb, var(--brand-line) 24%, transparent);
        }
        .brand-ig-glow:hover {
          outline-color: color-mix(in srgb, var(--brand-ig) 24%, transparent);
        }

        /* Skills grid (ใช้ร่วมกัน) */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 16px;
          transition: max-height 0.35s ease, opacity 0.25s ease,
            transform 0.25s ease;
          overflow: hidden;
        }
        .skills-grid.collapsed {
          max-height: 0;
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
        }
        .skills-grid.expanded {
          max-height: 1200px;
          opacity: 1;
          transform: translateY(0);
        }

        .skill-card {
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
          background: #fff;
        }
        .skill-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }
        .skill-logo {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #f5f5f5;
          display: grid;
          place-items: center;
          overflow: hidden;
        }
        .skill-logo img {
          width: 36px;
          height: 36px;
          object-fit: contain;
        }

        /* รายละเอียดแบบ React (แทน Collapse) */
        .details {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.3s ease, opacity 0.25s ease;
        }
        .details.show {
          max-height: 600px;
          opacity: 1;
        }

        /* แถบสีตามแบรนด์ (Design Tools) */
        .skill-card.canva .progress-bar {
          background: var(--canva);
        }
        .skill-card.photoshop .progress-bar {
          background: var(--ps);
        }
        .skill-card.illustrator .progress-bar {
          background: var(--ai);
        }
        .skill-card.premiere .progress-bar {
          background: var(--pr);
        }

        /* แถบสีตามแบรนด์ (Coding) */
        .skill-card.html .progress-bar {
          background: #e34c26;
        }
        .skill-card.css .progress-bar {
          background: #1572b6;
        }
        .skill-card.react .progress-bar {
          background: #61dafb;
          color: #000;
        }
        .skill-card.next .progress-bar {
          background: #000;
        }
        .skill-card.php .progress-bar {
          background: #777bb4;
        }

        /* Map wrapper */
        .map-wrap {
          display: block;
          aspect-ratio: 16 / 9;
          background: linear-gradient(180deg, #f5f5f5, #efefef);
          border-top: 1px solid #eee;
          overflow: hidden;
          border-radius: 0 0 1rem 1rem;
          position: relative;
          animation: map-skeleton 1.2s ease-in-out infinite alternate;
        }
        .map-wrap iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        @keyframes map-skeleton {
          from {
            opacity: 0.85;
          }
          to {
            opacity: 1;
          }
        }

        /* Copy toast */
        .copy-toast {
          position: fixed;
          left: 50%;
          bottom: 32px;
          transform: translateX(-50%) translateY(16px);
          background: #111;
          color: #fff;
          border-radius: 999px;
          padding: 10px 16px;
          font-size: 0.9rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
          z-index: 9999;
        }
        .copy-toast.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .avatar-glow,
          .map-wrap {
            animation: none;
          }
          .contact-card {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
