"use client";
import { fetchUsers, deleteUser, updateUser } from "@/lib/addminApi"; // ปรับ path ให้ตรงโปรเจกต์
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Edit11 from "./edit1";

export default function Admin1() {
  const [items, setItems] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getToken = () =>
    (typeof window !== "undefined" &&
      (localStorage.getItem("token") || sessionStorage.getItem("token"))) ||
    null;

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("โหลดข้อมูลล้มเหลว:", error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login1");
      return;
    }
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    const token = getToken();
    if (!token) return router.replace("/login1");

    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) return;
    try {
      await deleteUser(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      alert("ลบเรียบร้อยแล้ว");
    } catch (error) {
      alert("เกิดข้อผิดพลาด: " + (error?.message || error));
    }
  };

  const handleSave = async (updatedUser) => {
    const token = getToken();
    if (!token) return router.replace("/login1");

    try {
      const updated = await updateUser(updatedUser);
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      setEditingUser(null);
      alert("แก้ไขข้อมูลเรียบร้อย");
    } catch (err) {
      alert("เกิดข้อผิดพลาด: " + (err?.message || err));
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="card shadow">
        <div className="card-header bg-primary text-white fs-5 fw-bold">
          รายชื่อผู้ใช้
        </div>

        <div className="card-body">
          {loading ? (
            <div className="text-center text-muted py-4">กำลังโหลด…</div>
          ) : items.length === 0 ? (
            <div className="text-center text-muted py-4">ไม่พบข้อมูล</div>
          ) : (
            <>
              {/* 🟢 Mobile: แสดงเป็นการ์ด (ไม่ต้องเลื่อนซ้ายขวา) */}
              <div className="d-md-none">
                {items.map((item) => (
                  <div key={item.id} className="card mb-3 border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start gap-2">
                        <div className="flex-grow-1">
                          <div className="fw-bold text-truncate">
                            #{item?.id ?? "-"} • {item?.username ?? "-"}
                          </div>
                          <div className="small text-secondary mt-1 text-break">
                            {item?.firstname ?? "-"} {item?.fullname ?? "-"}{" "}
                            {item?.lastname ?? "-"}
                          </div>
                        </div>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-warning"
                            onClick={() => setEditingUser(item)}
                          >
                            แก้ไข
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            ลบ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 🖥️ Desktop/Tablet: ใช้ตารางตามเดิม */}
              <div className="table-responsive d-none d-md-block">
                <table className="table table-bordered table-striped table-hover table-sm align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th style={{ width: 70 }}>#</th>
                      <th>คำนำหน้า</th>
                      <th>ชื่อ</th>
                      <th>นามสกุล</th>
                      <th>ชื่อเล่น</th>
                      <th style={{ width: 90 }}>แก้ไข</th>
                      <th style={{ width: 70 }}>ลบ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>{item?.id ?? "-"}</td>
                        <td className="text-break">{item?.firstname ?? "-"}</td>
                        <td className="text-break">{item?.fullname ?? "-"}</td>
                        <td className="text-break">{item?.lastname ?? "-"}</td>
                        <td className="text-break">{item?.username ?? "-"}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm w-100"
                            onClick={() => setEditingUser(item)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm w-100"
                            onClick={() => handleDelete(item.id)}
                          >
                            ลบ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {editingUser && (
        <Edit11
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSave}
        />
      )}

      {/* ✅ ปรับ margin/padding นิดหน่อยสำหรับจอเล็ก + แก้ text overflow */}
      <style jsx>{`
        @media (max-width: 576px) {
          .container {
            padding-left: 8px;
            padding-right: 8px;
          }
          .card-body {
            padding: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
