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
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    setError(null); // Clear error when user modifies input
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!input.name || !input.email || !input.password) {
      setError("Please fill out all fields.");
      return;
    }

    if (!validateEmail(input.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(input.password)) {
      setError(
        "Password must be at least 8 characters long, include at least one uppercase letter and one number."
      );
      return;
    }

    axios
      .post("http://localhost:8085/api/users/signup", input)
      .then((response) => {
        if (response.data.status === "success") {
          alert("Account created successfully");
          router.push("/login");
        } else {
          setError("An unexpected error occurred.");
        }
      })
      .catch((error) => {
        if (error.response) {
          const { status } = error.response.data;
          if (status === "Email already exists") {
            setError("Email already exists! Try Login or create a new account.");
            setInput({
              name: "",
              email: "",
              password: "",
            });
          } else {
            setError("An unexpected error occurred.");
          }
        }
      });
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
            {error && error.includes("email") && (
              <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
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
            {error && error.includes("Password") && (
              <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
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
