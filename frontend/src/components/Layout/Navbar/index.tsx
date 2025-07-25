"use client";
import Button from "@/components/Inputs/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdPerson } from "react-icons/md";
import Container from "../Container";
import { User } from "@/service/@apitypes/UserType";

export default function Navbar({ user }: { user: User | null }) {
  const pathname = usePathname();
  return (
    <header className="bg-white shadow-md flex items-center fixed w-full  top-0 z-[40]">
      <Container className="flex justify-between items-center gap-4">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={120} height={60} priority />
        </Link>
        <nav className="justify-between items-center py-4 gap-5 flex">
          <Link
            href="/"
            className={pathname === "/" ? "text-green-500 font-bold" : ""}
          >
            Home
          </Link>
          <Link
            href="/blogs"
            className={pathname === "/blogs" ? "text-green-500 font-bold" : ""}
          >
            Blogs
          </Link>
          {/* <Link
            href="/users"
            className={pathname === "/users" ? "text-green-500 font-bold" : ""}
          >
            Users
          </Link> */}
        </nav>
        <div className="flex items-center gap-2 py-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center bg-accent rounded-full overflow-hidden shadow-sm cursor-pointer">
                  <MdPerson size={40} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    window.location.href = "/api/logout";
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button.Link
              href="/login"
              size="small"
              className={
                pathname === "/login" ? "text-green-500 font-bold" : ""
              }
            >
              Login
            </Button.Link>
          )}
        </div>
      </Container>
    </header>
  );
}
