'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Login from "./login/page";
export default function Home() {
  const token = localStorage.getItem('token');
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);
  return (
    <div>
      <main>
        <Login />

      </main>
    </div>
  );
}
