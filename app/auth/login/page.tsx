"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const signupSuccess = params.get("signup") === "success";
  const { login, loading } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const ok = await login(email, password);
    if (ok) {
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-background border border-foreground/10 rounded-lg p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {signupSuccess && (
          <div className="text-green-600 mb-4 text-sm text-center">Signup successful! Please log in.</div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring"
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring"
          disabled={loading}
        />
        {error && <div className="text-red-600 mb-4 text-sm">{error}</div>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account? <a href="/auth/signup" className="underline">Sign up</a>
        </div>
      </form>
    </div>
  );
} 