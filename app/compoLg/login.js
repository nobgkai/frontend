"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";
import Link from "next/link";
export default function Login({ onLogin }) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (id === "rememberMe" && type === "checkbox") {
      setRemember(checked);
      return;
    }
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "เข้าสู่ระบบไม่สำเร็จ");
      }

      // เก็บ token/role ตาม remember me
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("token", data.token);
      if (data?.role) storage.setItem("role", data.role);

      // ✅ แค่ redirect ไปหน้า admin
      router.push("/admin");
    } catch (err) {
      setErrorMsg(err.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-wrap gap-4"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <div
        className="p-4 border rounded-4 shadow-sm bg-white"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4" style={{ color: "#333" }}>
          เข้าสู่ระบบ
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-dark">
              ชื่อผู้ใช้
            </label>
            <input
              type="text"
              className="form-control input-effect"
              id="username"
              placeholder="Enter your username"
              required
              style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 ">
            <label htmlFor="password" className="form-label text-dark">
              รหัสผ่าน
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control input-effect"
              id="password"
              placeholder="Enter your password"
              required
              style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
              value={formData.password}
              onChange={handleChange}
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
            <Link
              href="/forgot-password"
              className="text-decoration-none text-secondary link-hover-effect"
            >
              ลืมรหัสผ่าน?
            </Link>
          </div>

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
            <Link
              href="/register1"
              className="text-dark fw-semibold link-effect"
            >
              สมัครสมาชิก
            </Link>
          </div>
        </form>
      </div>

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
