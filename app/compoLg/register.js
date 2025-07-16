import "./register.css";

export default function Register() {
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

            <form>
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
                  style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
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
                  style={{ backgroundColor: "#f9f9f9", borderColor: "#ccc" }}
                >
                  <option value="">-- เลือก --</option>
                  <option value="mr">นาย</option>
                  <option value="ms">นางสาว</option>
                  <option value="mrs">นาง</option>
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
                  placeholder="ชื่อจริง"
                  required
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
                    name="gender"
                    id="male"
                    value="male"
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
                    name="gender"
                    id="female"
                    value="female"
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
