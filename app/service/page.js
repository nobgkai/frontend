export default function Service() {
  return (
    <>
      <main className="container py-5">
        <h1 className="text-center mb-5" data-aos="fade-down">
          Our Services
        </h1>

        <section className="row text-center mb-5">
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
            <div className="p-4 border rounded shadow-sm">
              <i className="fas fa-laptop-code fa-3x mb-3 text-primary"></i>
              <h3>Web Development</h3>
              <p>สร้างเว็บไซต์ที่สวยงามและตอบโจทย์ธุรกิจคุณ</p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <div className="p-4 border rounded shadow-sm">
              <i className="fas fa-mobile-alt fa-3x mb-3 text-success"></i>
              <h3>Mobile Apps</h3>
              <p>พัฒนาแอปมือถือที่ใช้งานง่ายและรวดเร็ว</p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="500">
            <div className="p-4 border rounded shadow-sm">
              <i className="fas fa-cloud fa-3x mb-3 text-info"></i>
              <h3>Cloud Services</h3>
              <p>โซลูชันคลาวด์เพื่อธุรกิจที่มีประสิทธิภาพสูง</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 data-aos="fade-up">Connect with us</h2>
          <div
            className="d-flex justify-content-center gap-4 mt-3"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fs-3"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://line.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fs-3"
            >
              <i className="fab fa-line"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fs-3"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
