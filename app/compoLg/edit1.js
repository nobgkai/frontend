"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // ✅ เพิ่มบรรทัดนี้

const API_BASE = "https://backend-nextjs-virid.vercel.app";
const USERS_API = `${API_BASE}/api/users`;

export default function Edit11({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: user?.id ?? "",
    firstname: user?.firstname ?? "",
    fullname: user?.fullname ?? "",
    lastname: user?.lastname ?? "",
    username: user?.username ?? "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      id: user?.id ?? "",
      firstname: user?.firstname ?? "",
      fullname: user?.fullname ?? "",
      lastname: user?.lastname ?? "",
      username: user?.username ?? "",
    });
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
        firstname: formData.firstname,
        fullname: formData.fullname,
        lastname: formData.lastname,
        username: formData.username,
      };

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

      // อัปเดตตารางฝั่ง parent
      onSave(
        updated && typeof updated === "object" ? updated : { ...formData }
      );

      // ✅ แสดง Swal เหมือนหน้า register
      await Swal.fire({
        icon: "success",
        title: "<h3>แก้ไขข้อมูลเรียบร้อย</h3>",
        showConfirmButton: false,
        timer: 1600,
        timerProgressBar: true,
      });

      onClose(); // ปิดโมดอลหลังแจ้งเตือน
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

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ background: "#fff", padding: 20, borderRadius: 8, width: 400 }}
      >
        <h3>แก้ไขข้อมูลผู้ใช้</h3>

        <label>คำนำหน้า</label>
        <select
          name="firstname"
          value={formData.firstname ?? ""}
          onChange={handleChange}
          required
          className="form-select mb-2"
        >
          <option value="">-- เลือกคำนำหน้า --</option>
          <option value="นาย">นาย</option>
          <option value="นาง">นาง</option>
          <option value="นางสาว">นางสาว</option>
        </select>

        <label>ชื่อ</label>
        <input
          name="fullname"
          type="text"
          value={formData.fullname ?? ""}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <label>นามสกุล</label>
        <input
          name="lastname"
          type="text"
          value={formData.lastname ?? ""}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <label>ชื่อเล่น</label>
        <input
          name="username"
          type="text"
          value={formData.username ?? ""}
          onChange={handleChange}
          required
          className="form-control mb-3"
        />

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={submitting}
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="btn btn-success"
            disabled={submitting}
          >
            {submitting ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </form>
    </div>
  );
}
