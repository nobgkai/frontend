// app/api/login/route.js
import { NextResponse } from "next/server";

const USERS_API = "https://backend-nextjs-virid.vercel.app/api/users";

// ถ้ามี bcryptjs จะใช้เทียบ hash ให้; ถ้าไม่มี จะ fallback เป็น null แล้วเทียบแบบ plain-text
async function getBcrypt() {
  try {
    const mod = await import("bcryptjs");
    return mod.default || mod;
  } catch {
    return null;
  }
}

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username.trim() ||
      !password
    ) {
      return NextResponse.json(
        { message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" },
        { status: 400 }
      );
    }

    // ดึง users จาก upstream
    const res = await fetch(USERS_API, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { message: "โหลดข้อมูลผู้ใช้ล้มเหลว" },
        { status: 502 }
      );
    }
    const users = await res.json();

    // หา user ตาม username (ตัดช่องว่างหัว–ท้าย)
    const uname = username.trim();
    const user = Array.isArray(users)
      ? users.find((u) => (u?.username ?? "").trim() === uname)
      : null;

    if (!user) {
      return NextResponse.json(
        { message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    // ตรวจรหัสผ่าน:
    // - ถ้า password ใน API เป็น bcrypt hash (เช่นขึ้นต้นด้วย $2b$) และมี bcryptjs -> ใช้ compare()
    // - มิฉะนั้น เทียบแบบ plain-text
    const bcrypt = await getBcrypt();
    const stored = user.password ?? "";

    let ok = false;
    const looksHashed =
      typeof stored === "string" && /^\$2[aby]\$\d{2}\$/.test(stored);

    if (looksHashed && bcrypt) {
      ok = await bcrypt.compare(password, stored);
    } else {
      // โหมดเล่น ๆ / plain-text
      ok = password === stored;
    }

    if (!ok) {
      return NextResponse.json(
        { message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    // สร้าง token เล่น ๆ (อยากทำจริงให้ใช้ JWT)
    const token = Buffer.from(
      `${user.id ?? "0"}:${user.username}:${Date.now()}`
    ).toString("base64");

    // ส่งเฉพาะข้อมูลที่จำเป็นกลับไป
    return NextResponse.json({
      token,
      id: user.id,
      username: (user.username ?? "").trim(),
      role: user.role ?? "user",
    });
  } catch (err) {
    console.error("login route error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
