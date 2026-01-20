// app/api/users/[id]/route.js
import { NextResponse } from "next/server";
export async function PUT(req, { params }) {
  const { id } = params; // ✅ แบบนี้ถูกแล้ว (ไม่ต้อง await)

  const token = req.headers.get("authorization") || "";
  const body = await req.json();

  const r = await fetch(`https://api-user-jet.vercel.app/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });

  const text = await r.text();

  return new NextResponse(text, {
    status: r.status,
    headers: { "Content-Type": "application/json" },
  });
}
export async function DELETE(req, { params }) {
  const token = req.headers.get("authorization");

  const r = await fetch(
    `https://api-user-jet.vercel.app/api/users/${params.id}`,
    {
      method: "DELETE",
      headers: token ? { Authorization: token } : {},
    }
  );

  const text = await r.text();
  return new Response(text, { status: r.status });
}
