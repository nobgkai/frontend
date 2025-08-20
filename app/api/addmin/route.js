// src/lib/usersApi.js
const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://itdev.cmtc.ac.th:3000";
const USERS_API = `${BASE}/api/users`;

export async function fetchUsers() {
  const res = await fetch(USERS_API, { cache: "no-store" });
  if (!res.ok) throw new Error("โหลดข้อมูลล้มเหลว");
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${USERS_API}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("ลบข้อมูลไม่สำเร็จ");
  // บาง API ไม่คืน body ก็โอเค ให้คืน true ไป
  return true;
}

export async function updateUser(user) {
  if (!user?.id) throw new Error("ไม่พบ id ของผู้ใช้");
  const res = await fetch(`${USERS_API}/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("อัปเดตข้อมูลไม่สำเร็จ");
  return res.json(); // สมมติ API คืน user ที่อัปเดตแล้ว
}
