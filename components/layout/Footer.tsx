import Link from "next/link";
import ThemeSwitcher from "../theme-switcher";

export default function Footer() {
    return (
        <div className="flex items-center justify-between mx-auto h-48 md:h-28 px-16 md:px-40 pb-20 md:pb-0 border-t-2 border-foreground/50 border-dashed">
            <Link href="/" className="text-xl font-semibold font-satoshi">
            Board Hub
            </Link>
            <ThemeSwitcher />
        </div>
    );
}