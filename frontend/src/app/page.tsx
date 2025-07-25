import Container from "@/components/Layout/Container";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Container as="main" className="py-10 flex flex-col mt-[40px] gap-10">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <Link href="/blogs">Blogs</Link>
        <Link href="/users">Users</Link>
      </Container>
    </>
  );
}
