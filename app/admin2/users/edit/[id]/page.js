// app/api/admin2/[id]/route.js
export async function PUT(req, { params }) {
  const id = params.id;
  const updatedUser = await req.json();

  // TODO: ทำการอัปเดต DB ตรงนี้

  // ส่งกลับข้อมูลใหม่
  return Response.json({ ...updatedUser, id });
}
