// app/api/login/route.js
import { NextResponse } from "next/server";

const USERS_API = "https://backend-nextjs-virid.vercel.app/api/users";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" },
        { status: 400 }
      );
    }

    // ดึง users ทั้งหมด
    const r = await fetch(USERS_API, { cache: "no-store" });
    if (!r.ok)
      return NextResponse.json(
        { message: "โหลดข้อมูลผู้ใช้ล้มเหลว" },
        { status: 502 }
      );
    const data = await r.json();
    const users = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : [];

    // หา user ตาม username (ตัดช่องว่าง)
    const u = users.find(
      (x) => String(x?.username || "").trim() === String(username).trim()
    );
    if (!u)
      return NextResponse.json(
        { message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );

    // เช็ครหัสผ่าน — ถ้ามี bcrypt ก็ใช้, ไม่มีก็เทียบตรงๆ
    let ok = false;
    const stored = String(u.password || "");
    try {
      if (/^\$2[aby]\$\d{2}\$/.test(stored)) {
        const bcrypt =
          (await import("bcryptjs")).default || (await import("bcryptjs"));
        ok = await bcrypt.compare(password, stored);
      } else {
        ok = password === stored;
      }
    } catch {
      // ถ้า import bcrypt ไม่ได้ ให้เทียบตรงๆ
      ok = password === stored;
    }

    if (!ok) {
      return NextResponse.json(
        { message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    // token ง่ายๆ
    const token = Buffer.from(
      `${u.id || 0}:${u.username}:${Date.now()}`
    ).toString("base64");

    return NextResponse.json({
      token,
      id: u.id,
      username: String(u.username || "").trim(),
      role: u.role || "user",
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
