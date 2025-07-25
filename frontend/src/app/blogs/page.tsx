import BlogCard from "@/components/Cards/BlogCard";
import Container from "@/components/Layout/Container";
import Pagination from "@/components/Layout/Pagination";
import api from "@/service/api";

type Props = {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
};
export default async function BlogsPage({ searchParams }: Props) {
  const { page, pageSize } = await searchParams;
  const { data } = await api.blogs.getAll({ page, pageSize });
  const blogs = data.data;

  return (
    <>
      <Container
        as="main"
        className="py-10 mt-[40px] flex flex-col gap-10 flex-1"
      >
        <h1 className="text-2xl font-bold">Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 ">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} href={`/blogs/${blog.id}`} blog={blog} />
          ))}
        </div>
        <Pagination totalPages={data.totalPages} />
      </Container>
    </>
  );
}
