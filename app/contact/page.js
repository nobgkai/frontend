"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <main className="container py-5">
      {/* HERO */}
      <section className="text-center mb-5" style={{ marginTop: 60 }}>
        <h1 data-aos="fade-down" className="fw-bold mb-3">
          🍎 Contact Us
        </h1>
        <p data-aos="fade-up" className="text-muted fs-5">
          เว็บไซต์แห่งนี้สร้างขึ้นเพื่อเป็นแหล่งความรู้เกี่ยวกับผลไม้
          ไม่ว่าจะเป็นคุณค่าทางโภชนาการ ประโยชน์ต่อสุขภาพ หรือเกร็ดน่ารู้เล็ก ๆ
          น้อย ๆ เราพร้อมที่จะให้คำปรึกษา ตอบข้อสงสัย
          และแลกเปลี่ยนความรู้กับทุกท่าน หากคุณสนใจอยากร่วมแบ่งปันประสบการณ์
          หรือพูดคุยเพิ่มเติม สามารถติดต่อเราได้ตามช่องทางด้านล่างนี้เลยครับ
          🍊🍇🥭
        </p>
      </section>

      {/* CONTACT INFO */}
      <section className="row g-4 text-center">
        <div className="col-md-4" data-aos="zoom-in">
          <div className="p-4 border rounded-4 shadow-sm bg-light h-100 contact-card">
            <i className="bi bi-geo-alt-fill text-danger fs-1 mb-3"></i>
            <h4>ที่ตั้ง</h4>
            <p>
              123 ถนนสุขภาพผลไม้
              <br />
              อำเภอเมือง, จังหวัดเชียงใหม่
            </p>
          </div>
        </div>

        <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
          <div className="p-4 border rounded-4 shadow-sm bg-light h-100 contact-card">
            <i className="bi bi-telephone-fill text-success fs-1 mb-3"></i>
            <h4>โทรศัพท์</h4>
            <p>+66 89 123 4567</p>
          </div>
        </div>

        <div className="col-md-4" data-aos="zoom-in" data-aos-delay="400">
          <div className="p-4 border rounded-4 shadow-sm bg-light h-100 contact-card">
            <i className="bi bi-envelope-fill text-primary fs-1 mb-3"></i>
            <h4>อีเมล</h4>
            <p>info@fruithealth.com</p>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="text-center mt-5" data-aos="fade-up">
        <h3 className="mb-4">🌐 Social Media</h3>
        <div className="d-flex justify-content-center gap-4 fs-3">
          <a href="#" className="text-primary contact-icon">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="text-success contact-icon">
            <i className="bi bi-line"></i>
          </a>
          <a href="#" className="text-danger contact-icon">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </section>

      {/* STYLE */}
      <style jsx>{`
        .contact-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .contact-icon {
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .contact-icon:hover {
          transform: scale(1.2) rotate(10deg);
          color: #ff9800 !important;
        }
      `}</style>
    </main>
  );
}
