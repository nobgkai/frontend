export async function fetchUsers() {
  const res = await fetch("http://itdev.cmtc.ac.th:3000/api/users");
  if (!res.ok) throw new Error("โหลดข้อมูลล้มเหลว");
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("ลบข้อมูลไม่สำเร็จ");
  return true;
}

export async function updateUser(user) {
  const res = await fetch("http://itdev.cmtc.ac.th:3000/api/users", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("อัปเดตข้อมูลไม่สำเร็จ");
  return res.json();
}
