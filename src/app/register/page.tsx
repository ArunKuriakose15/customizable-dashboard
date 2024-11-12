// components/Register.tsx
'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";

const Register: React.FC = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  });

  const router = useRouter();

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={inputHandler}
              placeholder="Enter your name"
              required
            />

          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              name="email"
              value={input.email}
              onChange={inputHandler}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={inputHandler}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
