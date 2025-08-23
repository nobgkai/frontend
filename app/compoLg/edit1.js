"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const API_BASE = "https://backend-nextjs-virid.vercel.app";
const USERS_API = `${API_BASE}/api/users`;

export default function Edit11({ user, onClose, onSave }) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    id: user?.id ?? "",
    firstname: user?.firstname ?? "",
    fullname: user?.fullname ?? "",
    lastname: user?.lastname ?? "",
    username: user?.username ?? "",
    password: "", // ✅ ใส่ว่างไว้ ถ้าไม่กรอกจะไม่อัปเดต
    address: user?.address ?? "",
    sex: user?.sex ?? "",
    birthday: user?.birthday ? user.birthday.slice(0, 10) : "", // รองรับรูปแบบ ISO
  });

  useEffect(() => {
    setFormData({
      id: user?.id ?? "",
      firstname: user?.firstname ?? "",
      fullname: user?.fullname ?? "",
      lastname: user?.lastname ?? "",
      username: user?.username ?? "",
      password: "",
      address: user?.address ?? "",
      sex: user?.sex ?? "",
      birthday: user?.birthday ? String(user.birthday).slice(0, 10) : "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ ตรวจวันเกิดไม่ให้เป็นอนาคต
    if (formData.birthday) {
      const today = new Date();
      const bd = new Date(formData.birthday);
      if (bd > today) {
        Swal.fire({
          icon: "warning",
          title: "วันเกิดไม่ถูกต้อง",
          text: "กรุณาเลือกวันที่ที่ผ่านมาแล้ว",
        });
        return;
      }
    }

    setSubmitting(true);
    try {
      // ✅ สร้าง payload โดยตัดฟิลด์ว่าง/ไม่จำเป็น
      const payload = {
        id: formData.id,
        firstname: (formData.firstname || "").trim(),
        fullname: (formData.fullname || "").trim(),
        lastname: (formData.lastname || "").trim(),
        username: (formData.username || "").trim(),
        address: formData.address?.trim() || null,
        sex: formData.sex || null,
        birthday: formData.birthday || null,
      };
      if (formData.password && formData.password.trim() !== "") {
        payload.password = formData.password.trim();
      }

      const res = await fetch(USERS_API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      const updated = (() => {
        try {
          return JSON.parse(text);
        } catch {
          return null;
        }
      })();

      if (!res.ok) {
        throw new Error(updated?.message || text || "อัปเดตไม่สำเร็จ");
      }

      // แจ้ง parent อัปเดตตาราง
      onSave(
        updated && typeof updated === "object"
          ? updated
          : { ...user, ...payload }
      );

      await Swal.fire({
        icon: "success",
        title: "<h3>แก้ไขข้อมูลเรียบร้อย</h3>",
        showConfirmButton: false,
        timer: 1600,
        timerProgressBar: true,
      });

      onClose();
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err?.message || "อัปเดตไม่สำเร็จ",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const closeOnBackdrop = (e) => {
    if (e.target.id === "modalOverlay") onClose?.();
  };

  return (
    <div
      id="modalOverlay"
      onClick={closeOnBackdrop}
      className="modal-overlay"
      aria-modal="true"
      role="dialog"
    >
      <form onSubmit={handleSubmit} className="card">
        <div className="card-header">
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
            name="firstname"
            value={formData.firstname ?? ""}
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

        {/* ชื่อ / นามสกุล / ชื่อเล่น */}
        <div className="grid-2">
          <div className="mb-3">
            <label className="form-label">ชื่อ</label>
            <input
              name="fullname"
              type="text"
              value={formData.fullname ?? ""}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="ชื่อจริง"
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
            />
          </div>
        </div>

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
          />
        </div>

        {/* รหัสผ่าน (ไม่กรอก = ไม่เปลี่ยน) */}
        <div className="mb-3">
          <label className="form-label">รหัสผ่าน (เว้นว่างหากไม่เปลี่ยน)</label>
          <div className="password-row">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="••••••••"
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
        <div className="grid-2">
          <div className="mb-3">
            <label className="form-label">เพศ</label>
            <select
              name="sex"
              value={formData.sex ?? ""}
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
              name="birthday"
              type="date"
              value={formData.birthday ?? ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="actions">
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

      {/* ✨ มินิมอลสไตล์ + เอฟเฟกต์ภายในคอมโพเนนต์ */}
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
          padding: 16px;
        }
        .card {
          width: 100%;
          max-width: 720px;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
          padding: 18px 18px 14px;
          transform: translateY(6px) scale(0.98);
          animation: popIn 200ms ease-out forwards;
        }
        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 4px 10px;
          margin-bottom: 8px;
          border-bottom: 1px solid #eee;
        }
        .title {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.3px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 640px) {
          .grid-2 {
            grid-template-columns: 1fr;
          }
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
          margin-top: 6px;
        }
        .btn {
          border: 1px solid transparent;
          border-radius: 12px;
          padding: 8px 14px;
          font-size: 14px;
          line-height: 1.2;
          transition: transform 0.08s ease, box-shadow 0.18s ease,
            background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
          cursor: pointer;
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
