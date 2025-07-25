import BlogCard from "@/components/Cards/BlogCard";
import Container from "@/components/Layout/Container";
import api from "@/service/api";
import Link from "next/link";

export default async function Home() {
  const { data: blogData } = await api.blogs.getAll({ page: 1, pageSize: 10 });
  const blogs = blogData?.data;
  return (
    <>
      <Container as="main" className="py-10 flex flex-col mt-[40px] gap-10">
        <h1 className="text-2xl font-bold">Blog Site</h1>
        {blogs && blogs.length ? (
          <section>
            <h2>Latest Blogs</h2>
            <div className="grid">
              {blogs.map((blog) => (
                <BlogCard
                  href={`/blogs/${blog.id}`}
                  key={blog.id}
                  blog={blog}
                />
              ))}
            </div>
          </section>
        ) : null}
        <Link href="/blogs">Blogs</Link>
        <Link href="/users">Users</Link>
      </Container>
    </>
  );
}
