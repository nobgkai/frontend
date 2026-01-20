// app/api/users/route.js
export async function GET(req) {
  const token = req.headers.get("authorization");

  const r = await fetch("https://api-user-jet.vercel.app/api/users", {
    headers: {
      ...(token ? { Authorization: token } : {}),
    },
    cache: "no-store",
  });

  const data = await r.text();
  return new Response(data, { status: r.status });
}
