import Link from "next/link";
import Image from "next/image";

export default function Carousel() {
  return (
    <>
      <div data-aos="fade-up">
        <div
          id="carouselExample"
          className="carousel slide"
          style={{ height: "100%", overflow: "hidden" }}
        >
          <div className="carousel-inner" style={{ height: "100%" }}>
            <div className="carousel-item active">
              <img
                src="./img/fruit/bg1.png"
                className="d-block w-100"
                alt="..."
                style={{ objectFit: "cover", height: "100%" }}
              />
            </div>
            <div className="carousel-item" style={{ height: "100%" }}>
              <img
                src="./img/fruit/bg2.png"
                className="d-block w-100"
                alt="..."
                style={{ objectFit: "cover", height: "100%" }}
              />
            </div>
            <div className="carousel-item" style={{ height: "100" }}>
              <img
                src="./img/fruit/bg3.png"
                className="d-block w-100"
                alt="..."
                style={{ objectFit: "cover", height: "100%" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}
