import { NextResponse } from "next/server";
import { adminDB, adminStorage } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { authorId, content, imageBase64, isPublic } = await req.json();

    if (!authorId || !content) {
      return NextResponse.json({ error: "Missing fields..." }, { status: 400 });
    }

    let imageUrl = "";

    if (imageBase64) {
      // Get default bucket
      const bucket = adminStorage.bucket(); // bucket() exists on Storage
      const fileName = `posts/${Date.now()}.png`;
      const file = bucket.file(fileName);
      const buffer = Buffer.from(imageBase64, "base64");

      await file.save(buffer, { contentType: "image/png" });
      await file.makePublic(); // Make the file publicly accessible

      imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    }

    const newPost = {
      authorId,
      content,
      imageUrl,
      isPublic: false,
      createdAt: new Date(),
    };

    const docRef = await adminDB.collection("posts").add(newPost);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
