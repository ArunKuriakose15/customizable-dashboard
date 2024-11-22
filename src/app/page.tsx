'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const token=localStorage.getItem('token');
  console.log("first",token)
  const router=useRouter();
  useEffect(() => {
    if (token) {
      router.push("/login");
    }
  }, [token, router]);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
       <div className="font-extrabold text-lg">Hello world</div>

        
      </main>
    </div>
  );
}
