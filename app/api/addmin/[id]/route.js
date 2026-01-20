export const dynamic = "force-dynamic";

export async function PUT(req, ctx) {
  const { id } = await ctx.params;
  const payload = await req.json();

  const url = `https://002-backend.vercel.app/api/users/${encodeURIComponent(
    id
  )}`;
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify(cleanPayload(payload)); // ทำความสะอาด payload นิดหน่อย (ดูล่างสุด)

  // ลองทีละเมธอด: PATCH → PUT → POST
  for (const method of ["PATCH", "PUT", "POST"]) {
    const upstream = await fetch(url, {
      method,
      headers,
      body,
      cache: "no-store",
    });
    const text = await upstream.text();

    if (upstream.ok) {
      try {
        return Response.json(JSON.parse(text));
      } catch {
        return new Response(text, {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // ถ้าไม่ใช่ 405 (เช่น 400/422/500) ให้หยุดและส่งกลับเลย
    if (upstream.status !== 405) {
      return new Response(
        JSON.stringify({
          methodTried: method,
          upstreamStatus: upstream.status,
          upstreamBody: text,
        }),
        {
          status: upstream.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    // ถ้า 405 ค่อยลองเมธอดถัดไป
  }

  // ทุกเมธอดโดน 405
  return new Response(
    JSON.stringify({
      error: "All methods rejected",
      tried: ["PATCH", "PUT", "POST"],
    }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}

export async function GET(_req, ctx) {
  const { id } = await ctx.params;
  return Response.json({ ok: true, id });
}

// ---- helper: ตัด field ที่มักทำให้พัง และแปลง พ.ศ. → ค.ศ.
function cleanPayload(p) {
  const copy = { ...p };
  delete copy.id; // id อยู่ใน path แล้ว ไม่ต้องซ้ำใน body
  if (!p._changePassword) {
    // ถ้าไม่ได้ตั้งใจเปลี่ยนรหัส อย่าส่ง password
    delete copy.password;
  }
  if (copy.birthday) {
    const [y, m, d] = String(copy.birthday).split("-");
    const yr = Number(y);
    copy.birthday = yr > 2400 ? `${yr - 543}-${m}-${d}` : copy.birthday;
  }
  return copy;
}
