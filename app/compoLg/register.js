"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./register.css";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "",
    fullname: "", // ชื่อเต็ม
    lastname: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    birthday: "",
    agree: false, // เพิ่มตรงนี้
  });

  const handleChange = (e) => {
    const { id, value, name, type, checked } = e.target;
    const field = name || id;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://itdev.cmtc.ac.th:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        alert("สมัครสมาชิกสำเร็จ 🎉");
        router.push("/login1"); // ✅ พาไปหน้า Login
      } else {
        alert("เกิดข้อผิดพลาด: " + result.message);
      }
    } catch (err) {
      alert("ไม่สามารถเชื่อมต่อ API ได้");
      console.error(err);
    }
  };
  return (
    <div className="container mt-5">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "80vh", marginTop: "120px" }}
      >
        <div className="col-lg-7">
          <div className="p-4 border rounded-4 shadow-sm bg-white">
            <h2 className="text-center mb-4" style={{ color: "#333" }}>
              สมัครสมาชิก
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label text-dark">
                  ชื่อผู้ใช้
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="ชื่อผู้ใช้"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-dark">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="รหัสผ่าน"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
                />
              </div>

              {/* คำนำหน้า */}
              <div className="mb-3">
                <label htmlFor="prefix" className="form-label text-dark">
                  คำนำหน้าชื่อ
                </label>
                <select
                  id="firstname"
                  className="form-select"
                  required
                  value={formData.firstname}
                  onChange={handleChange}
                  style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
                >
                  <option value="">-- เลือก --</option>
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                </select>
              </div>

              {/* ชื่อ */}
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label text-dark">
                  ชื่อ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="ชื่อจริง"
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                  style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
                />
              </div>

              {/* นามสกุล */}
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label text-dark">
                  นามสกุล
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder="นามสกุล"
                  required
                  value={formData.lastname}
                  onChange={handleChange}
                  style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
                />
              </div>

              {/* ที่อยู่ */}
              <div className="mb-3">
                <label htmlFor="address" className="form-label text-dark">
                  ที่อยู่
                </label>
                <textarea
                  id="address"
                  className="form-control"
                  rows="3"
                  placeholder="ที่อยู่ปัจจุบัน"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
                ></textarea>
              </div>

              {/* เพศ */}
              <div className="mb-3">
                <label className="form-label text-dark">เพศ</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sex"
                    id="male"
                    value="ผู้ชาย"
                    checked={formData.sex === "ผู้ชาย"}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="male">
                    ชาย
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sex"
                    id="female"
                    value="ผู้หญิง"
                    checked={formData.sex === "ผู้หญิง"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="female">
                    หญิง
                  </label>
                </div>
              </div>

              {/* วันเกิด */}
              <div className="mb-3">
                <label htmlFor="birthdate" className="form-label text-dark">
                  วันเกิด
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  required
                  value={formData.birthday}
                  onChange={handleChange}
                  style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
                />
              </div>

              {/* ยอมรับเงื่อนไข */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="agree"
                  required
                  checked={formData.agree}
                  onChange={handleChange}
                />
                <label className="form-check-label text-dark " htmlFor="agree">
                  ฉันยอมรับเงื่อนไขและข้อตกลงการใช้งาน
                </label>
              </div>

              {/* ปุ่มสมัคร */}
              <button
                type="submit"
                className="btn w-100 btn-effect"
                style={{
                  backgroundColor: "#212121",
                  color: "#fff",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                }}
              >
                สมัครสมาชิก
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
