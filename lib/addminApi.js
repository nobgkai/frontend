const apiBaseUrl = "https://002-backend.vercel.app";

export const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export async function fetchUsers() {
  const token = getToken();
  if (!token) throw new Error("NO_TOKEN");

  const res = await fetch(`${apiBaseUrl}/api/users`, {
    headers: { Authorization: `Bearer ${token}` },
    mode: "cors",
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function updateUser(id, payload) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) throw new Error("NO_TOKEN");

  // Logic from proxy: remove username/password, ensure id in body
  const { username, password, ...rest } = payload;
  const safePayload = { id, ...rest };

  const res = await fetch(`${apiBaseUrl}/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(safePayload),
    mode: "cors",
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);
  return JSON.parse(text);
}

export async function deleteUser(id) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) throw new Error("NO_TOKEN");

  const res = await fetch(`${apiBaseUrl}/api/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    mode: "cors",
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);
  return true;
}
