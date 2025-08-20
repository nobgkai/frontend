'use client'

import { useMemo, useState } from 'react'

/**
 * วางคอมโพเนนต์นี้ "ต่อจากส่วนรูป" ที่มีการ์ดผลไม้ของคุณได้เลย
 * ตัวอย่างไฟล์: app/page.jsx หรือส่วนที่ต้องการ
 *
 * <FruitBenefitsSection />
 *
 * ✅ จุดเด่น UI
 * - แถบค้นหา + ตัวกรองตามอาการ/โรคที่สนใจ
 * - การ์ดแสดงประโยชน์หลักและวิตามินเด่น
 * - Modal รายละเอียดแบบเต็ม: สารอาหาร, โรคที่ช่วยชะลอ/ยับยั้ง, ข้อควรระวัง
 * - ปุ่ม "เปรียบเทียบ" ลิสต์ผลไม้ที่เลือกด้านล่างอย่างย่อ
 */

const CONDITIONS = [
  'สุขภาพหัวใจ',
  'ความดันโลหิต',
  'ภูมิคุ้มกัน',
  'ย่อยอาหาร',
  'สายตา/ผิวหนัง',
  'เบาหวานชนิดที่ 2',
  'ต้านอนุมูลอิสระ',
]

const FRUITS = [
  {
    id: 'apple',
    name: 'แอปเปิล',
    cover: '/img/fruit/apple.jpg',
    summary:
      'ไฟเบอร์สูง (เพคติน) ช่วยย่อยอาหาร คอเลสเตอรอล และน้ำตาลในเลือด',
    vitamins: ['วิตามิน C', 'ไฟเบอร์ (เพคติน)', 'โพลีฟีนอล'],
    helps: ['สุขภาพหัวใจ', 'เบาหวานชนิดที่ 2', 'ต้านอนุมูลอิสระ'],
    details: {
      nutrients: [
        { k: 'พลังงาน', v: '52 kcal / 100g' },
        { k: 'ไฟเบอร์', v: '~2.4 g' },
        { k: 'วิตามิน C', v: '~7% DV' },
        { k: 'โพลีฟีนอล', v: 'เควอซิติน, คาเทชิน' },
      ],
      conditions: [
        'ช่วยลดคอเลสเตอรอล LDL (ไฟเบอร์เพคติน)',
        'สนับสนุนสุขภาพหัวใจและหลอดเลือด',
        'ช่วยคุมระดับน้ำตาลหลังอาหาร',
      ],
      caution: 'แพ้ผลไม้ตระกูล Rosaceae ได้ในบางราย; ล้างเปลือกให้สะอาด',
    },
  },
  {
    id: 'pineapple',
    name: 'สับปะรด',
    cover: '/img/fruit/pineapple.jpg',
    summary: 'มีโบรมีเลนช่วยย่อยโปรตีน ลดอักเสบบางชนิด และวิตามิน C สูง',
    vitamins: ['โบรมีเลน', 'วิตามิน C', 'แมงกานีส'],
    helps: ['ย่อยอาหาร', 'ภูมิคุ้มกัน', 'ต้านอนุมูลอิสระ'],
    details: {
      nutrients: [
        { k: 'พลังงาน', v: '50 kcal / 100g' },
        { k: 'วิตามิน C', v: '~80% DV' },
        { k: 'แมงกานีส', v: 'สูง' },
      ],
      conditions: [
        'เอนไซม์โบรมีเลนช่วยย่อยโปรตีน ลดอาการท้องอืด',
        'วิตามิน C ช่วยภูมิคุ้มกันและคอลลาเจน',
      ],
      caution: 'ระคายปากได้ถ้าทานดิบมาก; ผู้แพ้โบรมีเลนควรเลี่ยง',
    },
  },
  {
    id: 'banana',
    name: 'กล้วย',
    cover: '/img/fruit/banana.jpg',
    summary: 'แหล่งโพแทสเซียมและวิตามิน B6 ช่วยสมดุลความดันและพลังงาน',
    vitamins: ['โพแทสเซียม', 'วิตามิน B6', 'ไฟเบอร์'],
    helps: ['ความดันโลหิต', 'ย่อยอาหาร'],
    details: {
      nutrients: [
        { k: 'พลังงาน', v: '89 kcal / 100g' },
        { k: 'โพแทสเซียม', v: '~358 mg' },
        { k: 'วิตามิน B6', v: '~20% DV' },
      ],
      conditions: [
        'โพแทสเซียมช่วยสมดุลโซเดียม สนับสนุนความดันโลหิต',
        'ไฟเบอร์ละลายน้ำช่วยระบบทางเดินอาหาร',
      ],
      caution:
        'ผู้โรคไตรุนแรงต้องจำกัดโพแทสเซียม; กล้วยสุกจัดมีน้ำตาลสูงกว่า',
    },
  },
  {
    id: 'orange',
    name: 'ส้ม',
    cover: '/img/fruit/orange.jpg',
    summary: 'วิตามิน C สูง ฟลาโวนอยด์ช่วยต้านอนุมูลอิสระ บำรุงผิวและภูมิ',
    vitamins: ['วิตามิน C', 'ฟลาโวนอยด์', 'ไฟเบอร์ละลายน้ำ'],
    helps: ['ภูมิคุ้มกัน', 'ต้านอนุมูลอิสระ', 'สุขภาพหัวใจ'],
    details: {
      nutrients: [
        { k: 'พลังงาน', v: '47 kcal / 100g' },
        { k: 'วิตามิน C', v: '~88% DV' },
        { k: 'ไฟเบอร์', v: '~2.4 g' },
      ],
      conditions: [
        'ช่วยสร้างคอลลาเจนและซ่อมแซมผิว',
        'สารฟลาโวนอยด์ช่วยหัวใจและหลอดเลือด',
      ],
      caution: 'กรดสูง อาจระคายกระเพาะ/กรดไหลย้อนในบางราย',
    },
  },
  {
    id: 'guava',
    name: 'ฝรั่ง',
    cover: '/img/fruit/guava.jpg',
    summary:
      'วิตามิน C สูงมาก ไฟเบอร์สูง ช่วยน้ำตาลหลังอาหารและภูมิคุ้มกัน',
    vitamins: ['วิตามิน C', 'ไฟเบอร์', 'ไลโคปีน (บางพันธุ์)'],
    helps: ['เบาหวานชนิดที่ 2', 'ภูมิคุ้มกัน', 'ต้านอนุมูลอิสระ'],
    details: {
      nutrients: [
        { k: 'พลังงาน', v: '68 kcal / 100g' },
        { k: 'ไฟเบอร์', v: 'สูง' },
        { k: 'วิตามิน C', v: 'สูงมาก' },
      ],
      conditions: [
        'ไฟเบอร์ช่วยชะลอการดูดซึมน้ำตาลหลังอาหาร',
        'วิตามิน C สูง สนับสนุนภูมิคุ้มกัน',
      ],
      caution: 'เมล็ดแข็ง เคี้ยวไม่ละเอียดอาจท้องอืดในบางราย',
    },
  },
  {
    id: 'passion',
    name: 'เสาวรส',
    cover: '/img/fruit/passionfruit.jpg',
    summary: 'โพลีฟีนอลสูง กลิ่นหอมเฉพาะตัว ช่วยต้านอนุมูลอิสระและการอักเสบ',
    vitamins: ['วิตามิน C', 'วิตามิน A', 'โพลีฟีนอล'],
    helps: ['ต้านอนุมูลอิสระ', 'ภูมิคุ้มกัน'],
    details: {
      nutrients: [
        { k: 'พลังงาน', v: '97 kcal / 100g' },
        { k: 'ไฟเบอร์', v: '10 g' },
        { k: 'วิตามิน A/C', v: 'เด่น' },
      ],
      conditions: ['สนับสนุนต้านอนุมูลอิสระ', 'ช่วยภูมิคุ้มกัน'],
      caution: 'รสเปรี้ยวจัด; ผู้แพ้ละตินบางชนิดควรเลี่ยง',
    },
  },
]

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border text-sm transition-all ${
        active
          ? 'bg-black text-white border-black shadow'
          : 'bg-white hover:bg-neutral-100 border-neutral-300'
      }`}
    >
      {children}
    </button>
  )
}

function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-5 sm:p-6 mx-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border px-3 py-1 text-sm hover:bg-neutral-50"
        >
          ปิด
        </button>
        {children}
      </div>
    </div>
  )
}

export default function FruitBenefitsSection() {
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState([])
  const [active, setActive] = useState(null) // ผลไม้ที่เปิด modal
  const [compare, setCompare] = useState([])

  const toggleFilter = (k) =>
    setFilters((f) => (f.includes(k) ? f.filter((x) => x !== k) : [...f, k]))

  const filtered = useMemo(() => {
    return FRUITS.filter((f) => {
      const byText =
        !q || f.name.includes(q) || f.summary.toLowerCase().includes(q.toLowerCase())
      const byCond =
        filters.length === 0 || filters.every((c) => f.helps.includes(c))
      return byText && byCond
    })
  }, [q, filters])

  const toggleCompare = (id) => {
    setCompare((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id].slice(0, 4)
    )
  }

  const compareItems = FRUITS.filter((f) => compare.includes(f.id))

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" id="fruit-benefits">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl font-semibold">ประโยชน์ของผลไม้</h2>

          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ค้นหา: ชื่อผลไม้ / ประโยชน์"
              className="w-full md:w-80 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {CONDITIONS.map((c) => (
            <Chip key={c} active={filters.includes(c)} onClick={() => toggleFilter(c)}>
              {c}
            </Chip>
          ))}
          {filters.length > 0 && (
            <button
              onClick={() => setFilters([])}
              className="text-sm underline underline-offset-4"
            >
              ล้างตัวกรอง
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((f) => (
            <article
              key={f.id}
              className="group rounded-2xl border shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              <div className="aspect-[16/10] bg-neutral-100 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                  src={f.cover}
                  alt={f.name}
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{f.name}</h3>
                  <button
                    onClick={() => toggleCompare(f.id)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition ${
                      compare.includes(f.id)
                        ? 'bg-black text-white border-black'
                        : 'bg-white hover:bg-neutral-100'
                    }`}
                  >
                    {compare.includes(f.id) ? 'นำออก' : 'เปรียบเทียบ'}
                  </button>
                </div>

                <p className="text-sm text-neutral-700">{f.summary}</p>

                <div className="flex flex-wrap gap-2 mt-1">
                  {f.vitamins.map((v) => (
                    <span
                      key={v}
                      className="text-xs px-2 py-1 rounded-full border border-neutral-300"
                    >
                      {v}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-1">
                  {f.helps.map((h) => (
                    <span key={h} className="text-xs text-neutral-600">• {h}</span>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setActive(f)}
                    className="px-4 py-2 rounded-xl border bg-white hover:bg-neutral-100"
                  >
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {compareItems.length > 0 && (
          <div className="mt-4 border rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">รายการเปรียบเทียบ</h4>
              <button className="text-sm underline" onClick={() => setCompare([])}>
                ล้างทั้งหมด
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
              {compareItems.map((f) => (
                <div key={f.id} className="rounded-xl border p-3">
                  <div className="flex items-center gap-3">
                    <img src={f.cover} alt={f.name} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <div className="font-medium">{f.name}</div>
                      <div className="text-xs text-neutral-600">
                        {f.vitamins.join(' • ')}
                      </div>
                    </div>
                  </div>
                  <ul className="list-disc pl-5 mt-2 text-sm text-neutral-700 space-y-1">
                    {f.details.conditions.slice(0, 3).map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal รายละเอียด */}
      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={active.cover}
                alt={active.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div>
                <div className="text-xl font-semibold">{active.name}</div>
                <div className="text-sm text-neutral-600">{active.summary}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border p-4">
                <div className="font-medium mb-2">สารอาหารเด่น</div>
                <ul className="text-sm space-y-1">
                  {active.details.nutrients.map((n, i) => (
                    <li key={i} className="flex justify-between gap-3">
                      <span className="text-neutral-700">{n.k}</span>
                      <span className="font-medium">{n.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border p-4">
                <div className="font-medium mb-2">ช่วยชะลอ/สนับสนุน</div>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {active.details.conditions.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-xl border p-4 bg-amber-50/60">
              <div className="font-medium mb-1">ข้อควรระวัง</div>
              <p className="text-sm text-neutral-800">{active.details.caution}</p>
              <p className="text-xs text-neutral-600 mt-2">
                * ข้อมูลเป็นภาพรวมเพื่อการศึกษา ไม่ใช่คำแนะนำทางการแพทย์
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
