// app/page.tsx
export default function HomePage() {
  console.log(process.env.FIREBASE_STORAGE_BUCKET)
  return (
    <div className="max-w-3xl mx-auto text-center mt-20">
      <h2 className="text-3xl font-bold mb-4">Welcome to TwoSpace 💕</h2>
      <p className="text-slate-600 mb-6">
        A private space for couples to share their moments, memories, and thoughts.
      </p>
      <a
        href="/dashboard"
        className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition"
      >
        Go to Dashboard
      </a>
    </div>
  );
}

