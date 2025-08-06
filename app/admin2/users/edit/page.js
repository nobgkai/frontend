"use client";
import { useEffect, useState } from "react";

export default function Edit1({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...user });

  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 8,
          width: 400,
        }}
      >
        <h3>แก้ไขข้อมูลผู้ใช้</h3>

        <label>คำนำหน้า</label>
        <select
          name="firstname"
          value={formData.firstname}
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
          value={formData.fullname}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <label>นามสกุล</label>
        <input
          name="lastname"
          type="text"
          value={formData.lastname}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <label>ชื่อเล่น</label>
        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
          className="form-control mb-3"
        />

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            ยกเลิก
          </button>
          <button type="submit" className="btn btn-success">
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
}
