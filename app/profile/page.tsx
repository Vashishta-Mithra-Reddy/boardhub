"use client";
import { useAuth } from "@/contexts/auth/AuthContext";

export default function ProfilePage() {
    const {user} = useAuth();
    return (
        <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            {user && <p>Hello {user.email}</p>}
        </div>
    );

}