import Image from "next/image";
import "./Card.css";

export default function Card() {
  return (
    <>
      <div className="container py-5">
        <h2 className="text-center mb-4">การ์ดตัวอย่าง 3 ใบ</h2>
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <Image
                src="/img/5.jpg"
                alt="ภาพ 1"
                width={500}
                height={300}
                layout="responsive"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">การ์ดใบที่ 1</h5>
                <p className="card-text">
                  นี่คือข้อความในการ์ดใบแรก ใช้สำหรับแสดงตัวอย่างเนื้อหา.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <Image
                src="/img/6.jpg"
                alt="ภาพ 2"
                width={500}
                height={300}
                layout="responsive"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">การ์ดใบที่ 2</h5>
                <p className="card-text">
                  เนื้อหาในการ์ดใบที่สองมีความน่าสนใจ และมีประโยชน์มาก.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <Image
                src="/img/7.jpg"
                alt="ภาพ 3"
                width={500}
                height={300}
                layout="responsive"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">การ์ดใบที่ 3</h5>
                <p className="card-text">
                  ข้อความในใบสุดท้ายนี้อาจเป็นรายละเอียดของผลิตภัณฑ์หรือบริการ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
