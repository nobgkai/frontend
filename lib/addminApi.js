export const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export async function fetchUsers() {
  const token = getToken();
  if (!token) throw new Error("NO_TOKEN");

  const res = await fetch("/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function updateUser(user) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) throw new Error("NO_TOKEN");

  const res = await fetch(`/api/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "อัปเดตไม่สำเร็จ");

  return data; // ✅ ต้อง return จาก backend
}
export async function deleteUser(id) {
  const token = getToken();
  if (!token) throw new Error("NO_TOKEN");

  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(await res.text());
  return true;
}
