"use client";

import Link from "next/link";
import Navigation from "./Navigation";
import { useAuth } from "@/contexts/auth/AuthContext";

const Loading = () => (
  <div className="px-6 py-2.5 font-satoshi animate-pulse border-2 border-transparent rounded-lg bg-foreground/10 text-transparent transition-all duration-500 flex items-center justify-center">
    <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Header() {
  const { user, logout, loading } = useAuth();

  return (
    <nav className="w-full flex justify-center h-20 md:h-24 backdrop-blur-3xl sticky top-0 md:top-0 rounded-none md:rounded-none px-6 md:px-4 z-50 md:shadow-none border-b-2 border-foreground/50 border-dashed">
      <div className="w-full max-w-7xl flex justify-between items-center p-3 px-2 md:px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"} className="text-xl font-bold font-satoshi">Board Hub</Link>
        </div>
        <Navigation />
        {loading ? (
          <Loading />
        ) : user ? (
          <button
            onClick={logout}
            className="text-foreground font-satoshi border-2 border-transparent px-6 py-2.5 rounded-lg hover:text-foreground bg-foreground/10 hover:bg-foreground/20 cursor-pointer transition-all duration-500"
          >
            Logout
          </button>
        ) : (
          <Link
            href={"/auth/login"}
            className="text-foreground font-satoshi border-2 border-transparent px-6 py-2.5 rounded-lg hover:text-foreground bg-foreground/10 hover:bg-foreground/20 transition-all duration-500"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
