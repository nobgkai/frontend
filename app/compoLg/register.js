"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "./register.css";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    prefix: "",
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    address: "",
    gender: "",
    birthdate: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    const field = name || id;

    setFormData((prev) => ({
      ...prev,
      [field]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiBaseUrl = "https://002-backend.vercel.app";
      const res = await fetch(`${apiBaseUrl}/api/register2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        mode: "cors",
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        // ถ้า response ไม่มี body
      }

      if (!res.ok) {
        throw new Error(data.message || "สมัครไม่สำเร็จ");
      }

      await Swal.fire({
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ!",
        text: "คุณสามารถเข้าสู่ระบบได้ทันที",
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/login1");
    } catch (err) {
      Swal.fire("ผิดพลาด", err.message, "error");
    }
  };
  return (
    <div className="container mt-5">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "80vh", marginTop: "120px" }}
      >
        <div className="col-lg-7">
          <div className="p-4 border rounded-4 shadow-sm bg-swhite">
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
                  required
                  value={formData.username}
                  onChange={handleChange}
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
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* คำนำหน้า */}
              <div className="mb-3">
                <label htmlFor="prefix" className="form-label text-dark">
                  คำนำหน้าชื่อ
                </label>
                <select
                  id="prefix"
                  className="form-select"
                  required
                  value={formData.prefix}
                  onChange={handleChange}
                >
                  <option value="">-- เลือก --</option>
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                </select>
              </div>

              {/* ชื่อ */}
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label text-dark">
                  ชื่อ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  required
                  value={formData.firstname}
                  onChange={handleChange}
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
                  required
                  value={formData.lastname}
                  onChange={handleChange}
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
                  required
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              {/* เพศ */}
              <div className="mb-3">
                <label className="form-label text-dark">เพศ</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="ชาย"
                    checked={formData.gender === "ชาย"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="male">
                    ชาย
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="หญิง"
                    checked={formData.gender === "หญิง"}
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
                  id="birthdate"
                  required
                  value={formData.birthdate}
                  onChange={handleChange}
                />
              </div>

              {/* ยอมรับเงื่อนไข */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                />
                <label className="form-check-label text-dark" htmlFor="agree">
                  ฉันยอมรับเงื่อนไขและข้อตกลงการใช้งาน
                </label>
              </div>

              <button type="submit" className="btn w-100 btn-effect">
                สมัครสมาชิก
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
