"use client";

import { useState } from "react"; // ← ถ้ายังไม่ใส่

import "./login.css";
import Image from "next/image";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-wrap gap-4"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      {/* กล่องฟอร์ม */}
      <div
        className="p-4 border rounded-4 shadow-sm bg-white"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4" style={{ color: "#333" }}>
          เข้าสู่ระบบ
        </h2>

        <form>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-dark">
              Email
            </label>
            <input
              type="email"
              className="form-control input-effect"
              id="email"
              placeholder="Enter your email"
              required
              style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
            />
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label text-dark">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control input-effect"
              id="password"
              placeholder="Enter your password"
              required
              style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
            />
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={togglePassword}
              style={{
                position: "absolute",
                top: "38px",
                right: "10px",
                cursor: "pointer",
                color: "#666",
              }}
            ></i>
          </div>

          {/* จำฉันไว้ / ลืมรหัสผ่าน */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label
                className="form-check-label text-dark"
                htmlFor="rememberMe"
              >
                จำฉันไว้
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-decoration-none text-secondary link-hover-effect"
            >
              ลืมรหัสผ่าน?
            </a>
          </div>

          {/* ปุ่ม */}
          <button
            type="submit"
            className="btn w-100 mb-3 btn-effect"
            style={{
              backgroundColor: "#212121",
              color: "#fff",
              fontWeight: "bold",
              letterSpacing: "0.5px",
            }}
          >
            ยืนยัน
          </button>

          {/* ยังไม่มีบัญชี / สมัคร */}
          <div className="d-flex justify-content-center align-items-center text-muted">
            <span>ยังไม่มีบัญชีใช่ไหม</span>
            <div
              style={{
                width: "1px",
                height: "18px",
                backgroundColor: "#999",
                margin: "0 10px",
              }}
            ></div>
            <a href="./register1" className="text-dark fw-semibold link-effect">
              สมัครสมาชิก
            </a>
          </div>
        </form>
      </div>

      {/* กล่องรูปภาพ */}
      <div>
        <img
          src="./img/imglogin/1.png"
          alt="Login"
          className="img-fluid rounded-4 shadow-sm"
          style={{
            width: "400px",
            height: "auto",
            maxHeight: "420px",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
