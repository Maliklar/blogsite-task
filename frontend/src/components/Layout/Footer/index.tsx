import Image from "next/image";
import Container from "../Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto flex flex-col gap-0">
      <Container className="flex-col sm:flex-row flex  sm:justify-between justify-center items-center gap-4 ">
        <div className="flex justify-between items-center flex-col gap-1">
          <p>Copyright © 2025</p>
        </div>{" "}
        <nav className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="ps-2 bg-white w-fit">
          <Image src="/logo.png" alt="logo" width={120} height={60} priority />
        </div>
      </Container>
    </footer>
  );
}
