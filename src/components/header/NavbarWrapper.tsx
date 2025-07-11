'use client';
import { usePathname } from "next/navigation";
import NavbarComponent from "./NavbarComponent";

export default function NavbarWrapper() {
    const pathname = usePathname();

    if (pathname === '/dashboard' || '/home') {
        return null; // Do not render NavbarComponent for admin routes
    }
    return (
        <NavbarComponent />
    );
}
