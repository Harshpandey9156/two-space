// import { NextResponse } from "next/server";
// import { adminDB, adminStorage } from "@/lib/firebaseAdmin";

// export async function POST(req: Request) {
//   try {
//     const { authorId, content, imageBase64, isPublic } = await req.json();

//     if (!authorId || !content) {
//       return NextResponse.json({ error: "Missing fields..." }, { status: 400 });
//     }

//     let imageUrl = "";

//     if (imageBase64) {
//       // Get default bucket
//       const bucket = adminStorage.bucket(); // bucket() exists on Storage
//       const fileName = `posts/${Date.now()}.png`;
//       const file = bucket.file(fileName);
//       const buffer = Buffer.from(imageBase64, "base64");

//       await file.save(buffer, { contentType: "image/png" });
//       await file.makePublic(); // Make the file publicly accessible

//       imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
//     }

//     const newPost = {
//       authorId,
//       content,
//       imageUrl,
//       isPublic: false,
//       createdAt: new Date(),
//     };

//     const docRef = await adminDB.collection("posts").add(newPost);

//     return NextResponse.json({ success: true, id: docRef.id });
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import { adminDB } from "@/lib/firebaseAdmin";
// import cloudinary from "@/lib/cloudinary";

// export async function POST(req: Request) {
//   try {
//     const { authorId, content, imageBase64, isPublic } = await req.json();

//     if (!authorId || !content) {
//       return NextResponse.json({ error: "Missing fields..." }, { status: 400 });
//     }

//     let imageUrl = "";

//     // Upload to Cloudinary
//     if (imageBase64) {
//       const uploadResponse = await cloudinary.uploader.upload(
//         `data:image/png;base64,${imageBase64}`,
//         {
//           folder: "posts",
//         }
//       );
//       imageUrl = uploadResponse.secure_url;
//     }

//     const newPost = {
//       authorId,
//       content,
//       imageUrl,
//       isPublic: !!isPublic,
//       createdAt: new Date(),
//     };

//     const docRef = await adminDB.collection("posts").add(newPost);

//     return NextResponse.json({ success: true, id: docRef.id });
//   } catch (error: any) {
//     console.error("Error creating post:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { authorId, content, imageUrl, isPublic } = await req.json();

    if (!authorId || !content) {
      return NextResponse.json({ error: "Missing fields..." }, { status: 400 });
    }

    const newPost = {
      authorId,
      content,
      imageUrl: imageUrl || "",
      isPublic: isPublic?? false,
      createdAt: new Date(),
    };

    const docRef = await adminDB.collection("posts").add(newPost);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
