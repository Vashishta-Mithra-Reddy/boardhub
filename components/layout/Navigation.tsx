"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navigation() {
    const pathname = usePathname();
    return (
        <div className="hidden md:flex gap-4 font-satoshi">
              <Link href={"/"} className={`text-foreground px-5 py-2 rounded-lg hover:text-foreground hover:bg-foreground/10 border-2 border-background ${pathname==="/"?"bg-foreground/10 border-dashed border-foreground/10":""}`}>
                Home
              </Link>
              <Link href={"/boards"} className={`text-foreground px-5 py-2 rounded-lg hover:text-foreground hover:bg-foreground/10 border-2 border-background ${pathname==="/boards"?"bg-foreground/10 border-dashed border-foreground/10":""}`}>
                Boards
              </Link> 
              <Link href={"/profile"} className={`text-foreground px-5 py-2 rounded-lg hover:text-foreground hover:bg-foreground/10 border-2 border-background ${pathname==="/profile"?"bg-foreground/10 border-dashed border-foreground/10":""}`}>
                Profile
              </Link>
            </div>
    );
}