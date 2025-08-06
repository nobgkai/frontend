"use client";
import { fetchUsers, deleteUser, updateUser } from "../api/addmin/route"; // ปรับเส้นทางให้ตรงกับที่คุณเก็บฟังก์ชันนี้
import { useEffect, useState } from "react";
import Link from "next/link";

import Edit1 from "../admin2/users/edit/page";
export default function Admin1() {
  const [items, setItems] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setItems(data);
    } catch (error) {
      console.error("โหลดข้อมูลล้มเหลว:", error.message);
    }
  };

  useEffect(() => {
    loadUsers();
    const interval = setInterval(loadUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) return;
    try {
      await deleteUser(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      alert("ลบเรียบร้อยแล้ว");
    } catch (error) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    }
  };

  const handleSave = async (updatedUser) => {
    try {
      const updated = await updateUser(updatedUser);
      setItems((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setEditingUser(null);
      alert("แก้ไขข้อมูลเรียบร้อย");
    } catch (error) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="card shadow">
        <div className="card-header bg-primary text-white fs-5 fw-bold">
          รายชื่อผู้ใช้
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover text-center">
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
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-muted">
                      ไม่พบข้อมูล
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.fullname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.username}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            console.log("ID ที่ส่งเข้า modal:", item.id);

                            setEditingUser(item);
                          }} // หรือ onClick={() => setEditingUser(item.id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            console.log("ID ที่ส่งเข้า modal:", item.id);
                            handleDelete(item.id);
                          }}
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingUser && (
        <Edit1
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
