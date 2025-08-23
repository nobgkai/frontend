// lib/addminApi.js
const BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://backend-nextjs-virid.vercel.app";
const USERS_API = `${BASE}/api/users`;

export async function fetchUsers() {
  const res = await fetch(USERS_API, { cache: "no-store" });
  if (!res.ok) throw new Error(`โหลดข้อมูลล้มเหลว: HTTP ${res.status}`);
  const data = await res.json();
  return Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];
}

export async function deleteUser(id) {
  const res = await fetch(`${USERS_API}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("ลบข้อมูลไม่สำเร็จ");
  return true;
}

// proxy ไป API route ฝั่ง Next ของคุณ (/api/addmin/:id)
export async function updateUser(user) {
  const res = await fetch("https://backend-nextjs-virid.vercel.app/api/users", {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      id: user.id,
      firstname: user.firstname,
      fullname: user.fullname,
      lastname: user.lastname,
      username: user.username,
    }),
  });
  const text = await res.text();
  if (!res.ok)
    throw new Error(`อัปเดตข้อมูลไม่สำเร็จ (HTTP ${res.status}): ${text}`);
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
