import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";

// GET /api/connections
// export async function GET(req: Request) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = await getAuth().verifyIdToken(token);
//     const userId = decoded.uid;

//     const connectionsRef = adminDB.collection("connections");

//     const q1 = await connectionsRef
//       .where("userId", "==", userId)
//       .get();


//     const q2 = await connectionsRef.where('connectedTo', '==', userId).get()

//     const allConnections = [...q1.docs, ...q2.docs]
//     // if (querySnapshot.empty) {
//     //   return NextResponse.json([]);
//     // }

//     const connectedUserIds = allConnections.map(doc => {
//         const data = doc.data();

//         return data.userId === userId ? data.connectedTo : data.userId;
//     })

//     const usersRef = adminDB.collection("users");
//     const connectedUsers: any[] = [];

//     for (const id of connectedUserIds) {
//       const userSnap = await usersRef.doc(id).get();
//       if (userSnap.exists) {
//         const data = userSnap.data();
//         connectedUsers.push({
//           uid: id,
//           name: data?.name || "Unnamed",
//           age: data?.age || 0,
//           gender: data?.gender || "N/A",
//           photoURL: data?.photoURL || "/default-avatar.png",
//           interests: data?.interests || [],
//           lookingFor: data?.lookingFor || "friendship",
//         });
//       }
//     }

//     return NextResponse.json(connectedUsers);
//   } catch (error) {
//     console.error("Error fetching connections:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch connections" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await getAuth().verifyIdToken(token);
    const userId = decoded.uid;

    const connectionsRef = adminDB.collection("connections");

    const q1 = await connectionsRef.where("userId", "==", userId).get();
    const q2 = await connectionsRef.where("connectedTo", "==", userId).get();

    const allConnections = [...q1.docs, ...q2.docs];

    if (allConnections.length === 0) {
      return NextResponse.json([]);
    }

    const connectedUserIds = allConnections.map(doc => {
      const data = doc.data();
      return data.userId === userId ? data.connectedTo : data.userId;
    });

    const usersRef = adminDB.collection("users");
    const connectedUsers: any[] = [];

    for (const id of connectedUserIds) {
      const userSnap = await usersRef.doc(id).get();
      if (userSnap.exists) {
        const data = userSnap.data();
        connectedUsers.push({
          uid: id,
          name: data?.name || "Unnamed",
          age: data?.age || 0,
          gender: data?.gender || "N/A",
          photoURL: data?.photoURL || "/default-avatar.jpg",
          interests: data?.interests || [],
          lookingFor: data?.lookingFor || "friendship",
        });
      }
    }

    return NextResponse.json(connectedUsers);
  } catch (error) {
    console.error("Error fetching connections:", error);
    return NextResponse.json(
      { error: "Failed to fetch connections" },
      { status: 500 }
    );
  }
}

// ✅ POST new connection
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, connectedTo } = body;

    if (!userId || !connectedTo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const docRef = await adminDB.collection("connections").add({
      userId,
      connectedTo,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id, userId, connectedTo });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}