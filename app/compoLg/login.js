// app/compoLg/login.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AOS from "aos";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  // เอฟเฟกต์/สไตล์ปุ่ม (ไม่ต้องแก้ก็ได้)
  const [btnHover, setBtnHover] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [focusField, setFocusField] = useState(null);

  useEffect(() => {
    // ใส่ AOS CSS แบบ client เท่านั้น
    if (
      typeof document !== "undefined" &&
      !document.querySelector("link[data-aos]")
    ) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/aos@2.3.4/dist/aos.css";
      link.setAttribute("data-aos", "true");
      document.head.appendChild(link);
    }
    // ใส่ Font Awesome ไว้ใช้ icon ตา (ถ้ายังไม่มี)
    if (
      typeof document !== "undefined" &&
      !document.querySelector("link[data-fa]")
    ) {
      const fa = document.createElement("link");
      fa.rel = "stylesheet";
      fa.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
      fa.setAttribute("data-fa", "true");
      document.head.appendChild(fa);
    }

    AOS.init({ duration: 900, easing: "ease-out-cubic", once: true });
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch(() => {});
  }, []);

  const togglePassword = () => setShowPassword((p) => !p);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (id === "rememberMe" && type === "checkbox") {
      setRemember(checked);
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const apiBaseUrl = "https://002-backend.vercel.app";
      const res = await fetch(`${apiBaseUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        mode: "cors",
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (!res.ok) {
        await Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: data?.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
          confirmButtonText: "ตกลง",
        });
        return;
      }

      // เก็บ token/role
      const storage = remember ? localStorage : sessionStorage;
      if (data?.token) storage.setItem("token", data.token);
      if (data?.role) storage.setItem("role", data.role);

      // ติ๊กถูกก่อนย้ายหน้า
      await Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
      });

      router.push("/admin");
    } catch {
      await Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาดเครือข่าย",
        text: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const buttonStyle = {
    backgroundColor: "#212121",
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    transform: btnActive
      ? "scale(0.97)"
      : btnHover
      ? "scale(1.03)"
      : "scale(1)",
    boxShadow: btnActive
      ? "0 2px 6px rgba(0,0,0,0.2)"
      : btnHover
      ? "0 6px 16px rgba(0,0,0,0.15)"
      : "none",
  };

  const baseInputStyle = {
    backgroundColor: "#f9f9f9",
    borderColor: "#ccc",
    transition: "box-shadow .2s, border-color .2s, background-color .2s",
  };
  const focusStyle = {
    borderColor: "#666",
    boxShadow: "0 0 5px rgba(0,0,0,0.15)",
    backgroundColor: "#fff",
    outline: "none",
  };
  const eyeStyle = {
    position: "absolute",
    top: "38px",
    right: "10px",
    cursor: "pointer",
    color: "#666",
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-wrap gap-4"
      style={{
        minHeight: "100vh",
        padding: 20,
        background: "linear-gradient(180deg,#fafafa,#fff)",
      }}
    >
      <div
        className="p-4 border rounded-4 shadow-sm bg-white"
        style={{
          width: 400,
          backdropFilter: "saturate(120%) blur(4px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h2
          className="text-center mb-4"
          style={{ color: "#333" }}
          data-aos="fade-down"
          data-aos-delay="150"
        >
          เข้าสู่ระบบ
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3" data-aos="fade-right" data-aos-delay="200">
            <label htmlFor="username" className="form-label text-dark">
              ชื่อผู้ใช้
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              required
              value={formData.username}
              onChange={handleChange}
              onFocus={() => setFocusField("username")}
              onBlur={() => setFocusField(null)}
              style={{
                ...baseInputStyle,
                ...(focusField === "username" ? focusStyle : null),
              }}
              autoComplete="username"
            />
          </div>

          <div
            className="mb-3"
            data-aos="fade-right"
            data-aos-delay="250"
            style={{ position: "relative" }}
          >
            <label htmlFor="password" className="form-label text-dark">
              รหัสผ่าน
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusField("password")}
              onBlur={() => setFocusField(null)}
              style={{
                ...baseInputStyle,
                paddingRight: 40,
                ...(focusField === "password" ? focusStyle : null),
              }}
              autoComplete="current-password"
            />
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={togglePassword}
              style={eyeStyle}
              aria-label="Toggle password visibility"
              title={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
            />
          </div>

          <div
            className="d-flex justify-content-between align-items-center mb-3"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={remember}
                onChange={handleChange}
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
              className="text-decoration-none text-secondary"
              style={{ transition: "color .2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6c757d")}
              data-aos="fade-left"
              data-aos-delay="320"
            >
              ลืมรหัสผ่าน?
            </Link>
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3"
            data-aos="zoom-in"
            data-aos-delay="350"
            style={buttonStyle}
            disabled={submitting}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => {
              setBtnHover(false);
              setBtnActive(false);
            }}
            onMouseDown={() => setBtnActive(true)}
            onMouseUp={() => setBtnActive(false)}
          >
            {submitting ? "กำลังเข้าสู่ระบบ..." : "ยืนยัน"}
          </button>

          <div
            className="d-flex justify-content-center align-items-center text-muted"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <span>ยังไม่มีบัญชีใช่ไหม</span>
            <span
              style={{
                width: 1,
                height: 18,
                backgroundColor: "#999",
                margin: "0 10px",
                display: "inline-block",
              }}
            />
            <Link
              href="/register1"
              className="fw-semibold"
              style={{
                color: "#333",
                textDecoration: "none",
                transition: "color .3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
            >
              สมัครสมาชิก
            </Link>
          </div>
        </form>
      </div>

      <div data-aos="zoom-in-left" data-aos-delay="200">
        <img
          src="/img/imglogin/1.png"
          alt="Login"
          className="img-fluid rounded-4 shadow-sm"
          style={{
            width: 400,
            height: "auto",
            maxHeight: 420,
            objectFit: "cover",
            transition:
              "transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "perspective(900px) rotateY(-6deg) rotateX(3deg) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.14)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
          }}
        />
      </div>
    </div>
  );
}
