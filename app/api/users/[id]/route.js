import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer "))
    return NextResponse.json({ message: "NO_TOKEN" }, { status: 401 });

  const id = Number(params?.id);
  if (!id) return NextResponse.json({ message: "NO_ID" }, { status: 400 });

  const body = await req.json();

  // ❌ API ปลายทางไม่ให้แก้ username / password
  delete body.username;
  delete body.password;

  const r = await fetch(`https://002-backend.vercel.app/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify({ id, ...body }), // ⭐ ต้องมี id ใน body
  });

  const text = await r.text();
  return new NextResponse(text, {
    status: r.status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(req, { params }) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer "))
    return NextResponse.json({ message: "NO_TOKEN" }, { status: 401 });

  const id = Number(params?.id);
  if (!id) return NextResponse.json({ message: "NO_ID" }, { status: 400 });

  // ❌ DELETE ห้ามมี body
  const r = await fetch(`https://002-backend.vercel.app/api/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: auth },
  });

  const text = await r.text();
  return new NextResponse(text, {
    status: r.status,
    headers: { "Content-Type": "application/json" },
  });
}
