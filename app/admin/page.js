"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function User1() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch("http://itdev.cmtc.ac.th:3000/api/users");
        if (!res.ok) {
          console.error("Failed to fetch data");
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getUsers();
    const interval = setInterval(getUsers, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleDelete = async (id) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) return;

    try {
      const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("ลบข้อมูลเรียบร้อยแล้ว");
        // อัปเดตหน้าโดยเอาผู้ใช้ที่ถูกลบออกจาก state
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        const error = await res.json();
        alert("เกิดข้อผิดพลาด: " + error.message);
      }
    } catch (err) {
      alert("ไม่สามารถเชื่อมต่อ API ได้");
      console.error(err);
    }
  };
  return (
    <>
      <div className="container " style={{ marginTop: "100px" }}>
        <div className="card shadow">
          <div className="card-header bg-primary text-white fs-5 fw-bold">
            รายชื่อผู้ใช้
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>คำนำหน้า</th>
                    <th>ชื่อ</th>
                    <th>นามสกุล</th>
                    <th>ชื่อเล่น</th>
                    <th>แก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.fullname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.username}</td>
                      <td>
                        <Link
                          href={`/edit/${item.id}`}
                          className="btn btn-sm btn-warning"
                        >
                          แก้ไข
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="fa fa-trash"></i>
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">
                        ไม่พบข้อมูล
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
