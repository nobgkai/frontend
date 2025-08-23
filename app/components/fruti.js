"use client";

import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // npm i aos

// --- ข้อมูลผลไม้ 12 ชนิด (Emoji/ไอคอน) ---
const FRUITS = [
  {
    id: "orange",
    name: "ส้ม",
    emoji: "🍊",
    nutrients: ["วิตามิน C", "ไฟเบอร์"],
    benefits: ["เสริมภูมิคุ้มกัน", "ต้านอนุมูลอิสระ"],
  },
  {
    id: "banana",
    name: "กล้วย",
    emoji: "🍌",
    nutrients: ["โพแทสเซียม", "วิตามิน B6"],
    benefits: ["ช่วยระบบขับถ่าย", "ควบคุมความดันโลหิต"],
  },
  {
    id: "apple",
    name: "แอปเปิล",
    emoji: "🍎",
    nutrients: ["ไฟเบอร์เพคติน", "โพลีฟีนอล"],
    benefits: ["ลดคอเลสเตอรอล", "ควบคุมระดับน้ำตาลในเลือด"],
  },
  {
    id: "watermelon",
    name: "แตงโม",
    emoji: "🍉",
    nutrients: ["น้ำ", "ไลโคปีน"],
    benefits: ["ให้ความสดชื่น", "บำรุงหัวใจ"],
  },
  {
    id: "pineapple",
    name: "สับปะรด",
    emoji: "🍍",
    nutrients: ["วิตามิน C", "แมงกานีส"],
    benefits: ["ช่วยย่อยอาหาร", "ลดการอักเสบ"],
  },
  {
    id: "papaya",
    name: "มะละกอ",
    emoji: "🥭",
    nutrients: ["วิตามิน A", "เอนไซม์ปาเปน"],
    benefits: ["ช่วยระบบขับถ่าย", "บำรุงสายตา"],
  },
  {
    id: "mango",
    name: "มะม่วง",
    emoji: "🥭",
    nutrients: ["วิตามิน A", "ไฟเบอร์"],
    benefits: ["บำรุงสายตา", "ช่วยการย่อยอาหาร"],
  },
  {
    id: "grape",
    name: "องุ่น",
    emoji: "🍇",
    nutrients: ["เรสเวอราทรอล", "วิตามิน K"],
    benefits: ["ชะลอความเสื่อม", "บำรุงหัวใจ"],
  },
  {
    id: "guava",
    name: "ฝรั่ง",
    emoji: "🍈",
    nutrients: ["วิตามิน C สูง", "ไฟเบอร์"],
    benefits: ["เสริมภูมิคุ้มกัน", "ควบคุมน้ำตาล"],
  },
  {
    id: "kiwi",
    name: "กีวี",
    emoji: "🥝",
    nutrients: ["วิตามิน C สูง", "ไฟเบอร์"],
    benefits: ["เสริมภูมิคุ้มกัน", "ช่วยระบบขับถ่าย"],
  },
  {
    id: "dragonfruit",
    name: "แก้วมังกร",
    emoji: "🐉",
    nutrients: ["ไฟเบอร์", "วิตามิน C"],
    benefits: ["ควบคุมน้ำหนัก", "บำรุงลำไส้"],
  },
  {
    id: "passionfruit",
    name: "เสาวรส",
    emoji: "🟣",
    nutrients: ["วิตามิน A", "วิตามิน C", "ไฟเบอร์"],
    benefits: ["บำรุงสายตา", "ช่วยการนอนหลับ", "ต้านอนุมูลอิสระ"],
  },
];

// --- ข้อเสียของการ "ไม่กิน" ผลไม้ (ไทม์ไลน์) ---
const NO_FRUIT_CONS = [
  {
    title: "ขาดไฟเบอร์ ➜ ท้องผูก/เสี่ยงริดสีดวง",
    detail: "ไฟเบอร์ช่วยการขับถ่ายและปริมาตรอุจจาระ",
  },
  {
    title: "จุลินทรีย์ดีในลำไส้ลดลง",
    detail: "พรีไบโอติกจากผลไม้ช่วยเลี้ยงจุลินทรีย์ที่ดี",
  },
  {
    title: "วิตามิน & สารต้านอนุมูลอิสระต่ำ",
    detail: "เพิ่มความเครียดออกซิเดชันภายในร่างกาย",
  },
  {
    title: "ภูมิคุ้มกันอ่อนลง",
    detail: "พลาดแหล่งวิตามิน C และไฟโตนิวเทรียนท์สำคัญ",
  },
  {
    title: "ผิวหมอง/แผลหายช้า",
    detail: "ขาดวิตามิน C และ A ที่ช่วยคอลลาเจนและผิวพรรณ",
  },
  {
    title: "อยากของหวาน/พลังงานเกินง่าย",
    detail: "ขาดไฟเบอร์ทำให้อิ่มช้า หิวบ่อย",
  },
  {
    title: "สุขภาพหัวใจ/ความดันแย่ลง",
    detail: "พลาดโพแทสเซียมและโพลีฟีนอลที่ดีต่อหลอดเลือด",
  },
  {
    title: "คุมระดับน้ำตาลยากขึ้น",
    detail: "ขาดไฟเบอร์ละลายน้ำที่ช่วยชะลอการดูดซึมน้ำตาล",
  },
  {
    title: "เสี่ยงขาดน้ำทางอ้อม",
    detail: "พลาดแหล่งน้ำจากผลไม้ (บางชนิดมีน้ำ >80%)",
  },
  {
    title: "สมาธิ/ความจำถดถอย",
    detail: "พลาดโพลีฟีนอลที่สนับสนุนสมองและการไหลเวียน",
  },
  {
    title: "โภชนาการขาดความหลากหลาย",
    detail: "สารอาหารรองจำนวนมากพบมากในผลไม้หลากสี",
  },
  {
    title: "แนวโน้มพึ่งอาหารแปรรูปสูงขึ้น",
    detail: "อาจได้รับโซเดียม/น้ำตาล/ไขมันทรานส์มากกว่า",
  },
];

export default function FruitBenefitsPage() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-quart" });
  }, []);

  const filtered = useMemo(() => {
    return FRUITS.filter((f) =>
      (f.name + f.benefits.join(" ") + f.nutrients.join(" "))
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="container my-4" data-aos="fade-in">
      <h1 className="text-center mb-2" data-aos="fade-down">
        ประโยชน์ของผลไม้
      </h1>
      <p
        className="alert alert-warning text-center"
        data-aos="zoom-in"
        data-aos-delay="100"
      >
        *ข้อมูลเพื่อการศึกษา ไม่ใช่คำแนะนำทางการแพทย์*
      </p>

      {/* ค้นหา */}
      <div className="mb-3" data-aos="fade-up" data-aos-delay="150">
        <input
          type="text"
          className="form-control"
          placeholder="ค้นหาชื่อผลไม้ / สารอาหาร / สรรพคุณ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* การ์ดผลไม้ */}
      <div className="row g-3">
        {filtered.map((fruit, idx) => (
          <div
            className="col-12 col-sm-6 col-md-4"
            key={fruit.id}
            data-aos="fade-up"
            data-aos-delay={(idx % 6) * 50}
          >
            <div className="card h-100 shadow-sm overflow-hidden rounded-4">
              <div className="px-3 pt-3 d-flex align-items-center gap-2">
                <span style={{ fontSize: "2.6rem", lineHeight: 1 }} aria-hidden>
                  {fruit.emoji}
                </span>
                <h5 className="card-title mb-0">{fruit.name}</h5>
              </div>
              <div className="card-body pt-2 pb-2">
                <p className="card-subtitle text-muted mb-0">
                  สารอาหารหลัก: {fruit.nutrients.join(", ")}
                </p>
              </div>
              <ul className="list-group list-group-flush">
                {fruit.benefits.map((b, i) => (
                  <li key={i} className="list-group-item">
                    <span className="me-2">✅</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-muted" data-aos="fade-in">
            ไม่พบผลไม้ที่ตรงเงื่อนไข
          </p>
        )}
      </div>

      {/* ============================= */}
      {/* ส่วนใหม่: ข้อเสียของการ "ไม่กิน" ผลไม้ */}
      {/* ============================= */}
      <section id="no-fruit-cons" className="my-5" data-aos="fade-up">
        <h2 className="mb-3 d-flex align-items-center gap-2">
          <span>🚫</span> ข้อเสียของการไม่กินผลไม้
        </h2>

        <div className="timeline">
          {NO_FRUIT_CONS.map((item, i) => (
            <div
              className="timeline-item"
              key={i}
              data-aos="fade-right"
              data-aos-delay={i * 70}
            >
              <div className="timeline-dot" />
              <div className="timeline-content card shadow-sm">
                <div className="card-body py-3">
                  <div className="fw-semibold">{item.title}</div>
                  <div className="text-muted small">{item.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* สไตล์ของไทม์ไลน์ + เอฟเฟกต์ */}
      <style jsx>{`
        .timeline {
          position: relative;
          margin-left: 28px;
          padding-left: 22px;
        }
        .timeline::before {
          content: "";
          position: absolute;
          left: 8px;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #22c55e, #16a34a);
          border-radius: 2px;
          filter: drop-shadow(0 0 6px rgba(22, 163, 74, 0.25));
        }
        .timeline-item {
          position: relative;
          margin: 18px 0;
        }
        .timeline-dot {
          position: absolute;
          left: -2px;
          top: 10px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #f43f5e, #ef4444);
          border: 4px solid #fff;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
          animation: pulse 2.2s infinite;
        }
        .timeline-content {
          margin-left: 36px;
          border-radius: 14px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .timeline-content:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(2, 6, 23, 0.12) !important;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.45);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }
        @media (prefers-color-scheme: dark) {
          .timeline::before {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
