// app/layout.tsx
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-rose-500 text-white p-4 flex justify-between items-center">
          <h1 className="font-bold text-xl">TwoSpace 💞</h1>
          <div className="space-x-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/dashboard" className="hover:underline">Dashboard</a>
          </div>
        </nav>
        <main className="p-6">
          <AuthProvider>
            {children}
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
