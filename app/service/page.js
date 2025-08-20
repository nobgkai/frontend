export default function Service() {
  return (
    <>
      <main className="container py-5" style={{ marginTop: "80px" }}>
        {/* Hero */}
        <section className="text-center mb-5" data-aos="fade-down">
          <h1 className="fw-bold">บริการของเรา</h1>
          <p className="text-muted">
            รับคัดเกรด จัดแพ็ก และส่งผลไม้สดถึงบ้าน — ติดต่อเราได้ทุกช่องทาง
          </p>
        </section>

        {/* Services (สั้น ๆ พอให้รู้ว่าทำอะไร) */}
        <section className="row text-center g-4 mb-5">
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="0">
            <div className="p-4 border rounded h-100">
              <i className="fas fa-apple-alt fa-2x mb-3 text-danger"></i>
              <h3 className="h5">คัดเกรดพรีเมียม</h3>
              <p className="mb-0">หวานฉ่ำ ลูกสวย ได้มาตรฐาน</p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
            <div className="p-4 border rounded h-100">
              <i className="fas fa-truck fa-2x mb-3 text-primary"></i>
              <h3 className="h5">ส่งด่วนแช่เย็น</h3>
              <p className="mb-0">รักษาความสดถึงมือ</p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
            <div className="p-4 border rounded h-100">
              <i className="fas fa-box-open fa-2x mb-3 text-warning"></i>
              <h3 className="h5">กล่องรายเดือน</h3>
              <p className="mb-0">ผลไม้ตามฤดูกาล เปลี่ยนเมนูทุกเดือน</p>
            </div>
          </div>
        </section>

        {/* Contact / Social */}
        <section className="mb-5" data-aos="zoom-in">
          <div className="p-4 p-md-5 border rounded-3 bg-light">
            <div className="row g-4 align-items-center">
              <div className="col-lg-7">
                <h2 className="h4 mb-2">ติดต่อเรา</h2>
                <p className="text-muted mb-4">
                  สอบถาม/สั่งซื้อ/ขอคำแนะนำ เลือกช่องทางที่สะดวกได้เลย
                </p>

                {/* ปุ่มโซเชียลใหญ่ ๆ คลิกง่าย */}
                <div className="d-flex flex-wrap gap-3">
                  <a
                    href="https://facebook.com/yourpage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary d-flex align-items-center"
                  >
                    <i className="fab fa-facebook me-2"></i> Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/youraccount"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-danger d-flex align-items-center"
                  >
                    <i className="fab fa-instagram me-2"></i> Instagram
                  </a>
                  <a
                    href="https://line.me/R/ti/p/@yourlineid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success d-flex align-items-center"
                  >
                    <i className="fab fa-line me-2"></i> LINE
                  </a>
                </div>

                {/* เบอร์ติดต่อ & อีเมล (ถ้ามี) */}
                <div className="mt-4">
                  <div className="small text-muted">
                    โทร <a href="tel:0912345678">091-234-5678</a> · อีเมล{" "}
                    <a href="mailto:support@yourdomain.com">
                      support@yourdomain.com
                    </a>
                  </div>
                </div>
              </div>

              {/* QR LINE (ถ้ามี) */}
              <div className="col-lg-5 text-center">
                {/* เปลี่ยน src เป็นรูป QR ของ LINE ร้านคุณ */}
                <img
                  src="/images/line-qr.png"
                  alt="สแกนเพิ่มเพื่อน LINE"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxWidth: 260 }}
                />
                <div className="mt-2 small text-muted">สแกนเพื่อแชทกับเรา</div>
              </div>
            </div>
          </div>
        </section>

        {/* ฟอร์มสั้น ๆ (ออปชัน) */}
        <section className="mb-5" data-aos="fade-up">
          <h2 className="h5 mb-3">ฝากข้อความด่วน</h2>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">ชื่อของคุณ</label>
              <input
                type="text"
                className="form-control"
                placeholder="เช่น กาย"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">อีเมล</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@email.com"
              />
            </div>
            <div className="col-12">
              <label className="form-label">ข้อความ</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="อยากได้ผลไม้อะไร งบประมาณเท่าไหร่?"
              ></textarea>
            </div>
            <div className="col-12">
              <button type="button" className="btn btn-primary">
                ส่งข้อความ
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
