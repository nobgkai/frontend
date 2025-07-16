import "./login.css";
import Image from "next/image";
export default function Login() {
  return (
    <>
      <div className="container mt-5">
        <div
          className="row justify-content-center align-items-center "
          style={{ minHeight: "80vh" }}
        >
          {/* แบบฟอร์ม */}
          <div className="col-lg-6">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h2 className="text-center mb-4" style={{ color: "#333" }}>
                เข้าสู่ระบบ
              </h2>

              <form>
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

                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-dark">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control input-effect"
                    id="password"
                    placeholder="Enter your password"
                    required
                    style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
                  />
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
                  <a
                    href="/forgot-password"
                    className="text-decoration-none text-secondary  link-hover-effect"
                  >
                    ลืมรหัสผ่าน?
                  </a>
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
                  <div className="vertical-line mx-2"></div>
                  <a
                    href="./register1"
                    className="text-dark fw-semibold link-effect"
                  >
                    สมัครสมาชิก
                  </a>
                </div>
              </form>
            </div>
          </div>

          {/* ภาพด้านขวา */}
          <div className="col-lg-5 d-none d-lg-block">
            <img
              src="./img/imglogin/1.png"
              alt="Login"
              className="img-fluid rounded-4 shadow-sm"
              style={{
                maxHeight: "420px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
