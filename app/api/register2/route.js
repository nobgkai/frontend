// api.js
export async function registerUser(data) {
  try {
    const res = await fetch("http://itdev.cmtc.ac.th:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

