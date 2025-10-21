 
 
// import { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "../../lib/firebase";

// interface AuthContextType {
//   currentUser: User | null;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType>({
//   currentUser: null,
//   loading: true,
// });

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
 
// "use client"
// import { onAuthStateChanged, User } from "firebase/auth";
// import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "@/lib/firebase";

// const AuthContext = createContext<{user: User | null}> ({user : null})

// export const AuthProvider = ({children} : {children : React.ReactNode}) => {
//     const [user, setUser] = useState<User | null>(null)

//     useEffect (() => {
//         const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//             setUser(firebaseUser)
//         });
//         return () => unsubscribe()
//     }, [])

//     return (
//     <AuthContext.Provider value={{ user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
 


// "use client";

// import { onAuthStateChanged, User } from "firebase/auth";
// import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "@/lib/firebase";

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       setUser(firebaseUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
    
//     return (
//       <div className="flex items-center justify-center h-screen text-lg font-semibold">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
 
"use client";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Profile {
  name?: string;
  age?: number;
  gender?: string;
  interests?: string[];
  lookingFor?: string;
  photoURL?: string;
}

interface AuthContextType {
  firebaseUser: User | null;
  profile: Profile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  profile: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProfile(docSnap.data() as Profile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, profile, loading }}>
 
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
