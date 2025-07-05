import Image from "next/image";
import "./Card.css";

export default function Card() {
  return (
    <>
      <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5 mt-5 ">
        <h1 className="heading text-body-emphasis">ผลไม้ 3 ชนิด</h1>
      </div>
      <div className="container py-5">
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-4 mb-4 ">
            <div className="card h-100 shadow-sm">
              <Image
                src="/img/b1.png"
                alt="ภาพ 1"
                width={500}
                height={300}
                layout="responsive"
                className="card-img-top"
              />
              <div className="card-body text-center ">
                <button className="minimal-btn">ดูเพิ่มเติม</button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <Image
                src="/img/b2.png"
                alt="ภาพ 2"
                width={500}
                height={300}
                layout="responsive"
                className="card-img-top"
              />
              <div className="card-body text-center ">
                <button className="minimal-btn">ดูเพิ่มเติม</button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <Image
                src="/img/b3.png"
                alt="ภาพ 3"
                width={500}
                height={300}
                layout="responsive"
                className="card-img-top"
              />
              <div className="card-body text-center ">
                <button className="minimal-btn">ดูเพิ่มเติม</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
