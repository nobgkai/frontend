"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { updateUser } from "@/lib/addminApi";

export default function Edit11({ user, onClose, onSave }) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    prefix: "",
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    gender: "",
    birthdate: "",
    address: "",
    role: "",
    status: "",
  });

  // 🔒 ล็อกสกอลล์พื้นหลังระหว่างเปิดโมดัล + sync user
  useEffect(() => {
    if (!user) return;

    setFormData({
      id: user.id ?? "",
      prefix: user.prefix ?? "",
      firstname: user.firstname ?? "",
      lastname: user.lastname ?? "",
      username: user.username ?? "",
      password: "",
      gender: user.gender ?? "",
      birthdate: user.birthdate ? String(user.birthdate).slice(0, 10) : "",
      address: user.address ?? "",
      role: user.role ?? "user",
      status: user.status ?? "active",
    });

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const payload = {
        id: formData.id,
        prefix: formData.prefix || null,
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        username: formData.username.trim(),
        gender: formData.gender || null,
        birthdate: formData.birthdate || null,
        address: formData.address?.trim() || null,
        role: formData.role,
        status: formData.status,
      };

      if (formData.password && formData.password.trim() !== "") {
        payload.password = formData.password.trim();
      }

      // 🔥 เรียกผ่าน adminApi เท่านั้น
      const updated = await updateUser(payload);

      onSave({ ...user, ...payload });

      await Swal.fire({
        icon: "success",
        title: "แก้ไขข้อมูลเรียบร้อย",
        timer: 1400,
        showConfirmButton: false,
      });

      onClose?.();
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text:
          err.message === "NO_TOKEN"
            ? "กรุณา login ใหม่"
            : err.message || "อัปเดตไม่สำเร็จ",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ปิดเมื่อคลิกด้านนอกการ์ด (กันกรณีคลิกภายในไม่ปิด)
  const closeOnBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      id="modalOverlay"
      onClick={closeOnBackdrop}
      className="modal-overlay"
      aria-modal="true"
      role="dialog"
    >
      <form
        onSubmit={handleSubmit}
        className="card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header sticky */}
        <div className="card-header sticky-top">
          <h3 className="title">แก้ไขข้อมูลผู้ใช้</h3>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* เนื้อหาที่เลื่อนได้ */}
        <div className="card-content">
          {/* ID (อ่านอย่างเดียว) */}
          <div className="mb-3">
            <label className="form-label">รหัสผู้ใช้ (ID)</label>
            <input
              name="id"
              type="text"
              value={formData.id}
              disabled
              className="form-control readonly"
            />
          </div>

          {/* คำนำหน้า */}
          <div className="mb-3">
            <label className="form-label">คำนำหน้า</label>
            <select
              name="prefix"
              value={formData.prefix ?? ""}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">-- เลือกคำนำหน้า --</option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
          </div>

          {/* ชื่อ / นามสกุล */}
          <div className="grid">
            <div className="mb-3">
              <label className="form-label">ชื่อ</label>
              <input
                name="firstname"
                type="text"
                value={formData.firstname ?? ""}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="ชื่อจริง"
                autoComplete="given-name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">นามสกุล</label>
              <input
                name="lastname"
                type="text"
                value={formData.lastname ?? ""}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="นามสกุล"
                autoComplete="family-name"
              />
            </div>
          </div>

          {/* ชื่อเล่น / Username */}
          <div className="mb-3">
            <label className="form-label">ชื่อเล่น</label>
            <input
              name="username"
              type="text"
              value={formData.username ?? ""}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="ชื่อเล่น / Username"
              autoComplete="username"
            />
          </div>

          {/* รหัสผ่าน (ไม่กรอก = ไม่เปลี่ยน) */}
          <div className="mb-3">
            <label className="form-label">
              รหัสผ่าน (เว้นว่างหากไม่เปลี่ยน)
            </label>
            <div className="password-row">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              >
                {showPassword ? "ซ่อน" : "แสดง"}
              </button>
            </div>
          </div>

          {/* ที่อยู่ */}
          <div className="mb-3">
            <label className="form-label">ที่อยู่</label>
            <textarea
              name="address"
              value={formData.address ?? ""}
              onChange={handleChange}
              rows={3}
              className="form-control"
              placeholder="บ้านเลขที่ / ถนน / ตำบล / อำเภอ / จังหวัด / รหัสไปรษณีย์"
            />
          </div>

          {/* เพศ / วันเกิด */}
          <div className="grid">
            <div className="mb-3">
              <label className="form-label">เพศ</label>
              <select
                name="gender"
                value={formData.gender ?? ""}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">-- เลือกเพศ --</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">วันเกิด</label>
              <input
                name="birthdate"
                type="date"
                value={formData.birthdate ?? ""}
                onChange={handleChange}
                className="form-control"
                autoComplete="bday"
              />
            </div>
          </div>
        </div>

        {/* ปุ่มล่าง sticky */}
        <div className="actions sticky-bottom">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={submitting}
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </form>

      {/* ✨ มินิมอล + Responsive + Sticky header/footer + Scrollable content */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(6px);
          z-index: 1000;
          animation: fadeIn 160ms ease-out;
          padding: clamp(8px, 2vw, 16px);
        }
        .card {
          width: clamp(320px, 92vw, 720px);
          /* สูงไม่เกินหน้าจอ เลื่อนส่วน content ด้านในแทน */
          max-height: min(86vh, 880px);
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
          display: grid;
          grid-template-rows: auto 1fr auto; /* header | content | footer */
          transform: translateY(6px) scale(0.98);
          animation: popIn 200ms ease-out forwards;
          overflow: hidden; /* บังคับมุมโค้งและซ่อนสกอลล์บาร์ส่วนเกิน */
        }
        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-bottom: 1px solid #eee;
          background: #fff;
          z-index: 1;
        }
        .title {
          margin: 0;
          font-size: clamp(16px, 2.4vw, 18px);
          font-weight: 700;
          letter-spacing: 0.3px;
        }
        .card-content {
          padding: 12px 14px;
          overflow: auto; /* ให้สกอลล์เฉพาะเนื้อหา */
          -webkit-overflow-scrolling: touch;
        }
        .sticky-top {
          position: sticky;
          top: 0;
        }
        .sticky-bottom {
          position: sticky;
          bottom: 0;
          background: #fff;
          border-top: 1px solid #eee;
          z-index: 1;
        }

        /* Grid ฟิลด์ปรับอัตโนมัติ */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
        }

        .mb-3 {
          margin-bottom: 12px;
        }
        .form-label {
          font-size: 13px;
          color: #374151;
          margin-bottom: 6px;
          display: block;
        }
        .form-control,
        .form-select,
        textarea.form-control {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 14px;
          outline: none;
          transition: box-shadow 0.18s ease, border-color 0.18s ease,
            transform 0.08s ease;
          background: #fff;
        }
        .form-control:focus,
        .form-select:focus,
        textarea.form-control:focus {
          border-color: #9ca3af;
          box-shadow: 0 0 0 4px rgba(156, 163, 175, 0.18);
        }
        .readonly {
          background: #f9fafb;
          color: #6b7280;
          cursor: not-allowed;
        }

        .password-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
          align-items: center;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          padding: 10px 14px;
        }

        .btn {
          border: 1px solid transparent;
          border-radius: 12px;
          padding: 9px 14px;
          font-size: 14px;
          line-height: 1.2;
          transition: transform 0.08s ease, box-shadow 0.18s ease,
            background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
          cursor: pointer;
          touch-action: manipulation;
        }
        .btn:active {
          transform: scale(0.98);
        }
        .btn-primary {
          background: #111827;
          color: #fff;
          box-shadow: 0 8px 18px rgba(17, 24, 39, 0.18);
        }
        .btn-primary:hover {
          box-shadow: 0 10px 22px rgba(17, 24, 39, 0.22);
        }
        .btn-outline {
          background: #fff;
          border-color: #d1d5db;
          color: #111827;
        }
        .btn-outline:hover {
          border-color: #9ca3af;
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
        }
        .btn-ghost {
          background: transparent;
          border-color: transparent;
          color: #6b7280;
        }
        .btn-ghost:hover {
          background: #f3f4f6;
          color: #111827;
        }

        /* ปรับบนจอเล็ก: ลด padding และฟอนต์เล็กลงนิดหน่อย */
        @media (max-width: 480px) {
          .card-header {
            padding: 8px 10px;
          }
          .card-content {
            padding: 10px;
          }
          .actions {
            padding: 8px 10px;
          }
          .btn {
            padding: 8px 12px;
            font-size: 13px;
          }
          .form-control,
          .form-select,
          textarea.form-control {
            padding: 9px 11px;
            font-size: 13.5px;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes popIn {
          to {
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
