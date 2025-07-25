import BlogCard from "@/components/Cards/BlogCard";
import Container from "@/components/Layout/Container";
import Section from "@/components/Layout/Section";
import api from "@/service/api";

export default async function ProfilePage() {
  const { data } = await api.blogs.getMy();

  return (
    <>
      <Container as="main" className="py-10 mt-[40px] flex flex-col gap-10">
        <h1 className="text-2xl font-bold">Profile</h1>

        {data && data.length ? (
          <Section title="My Blogs" subTitle="Edit and Delete your blogs">
            {data.map((blog) => (
              <BlogCard href={`/blogs/${blog.id}`} key={blog.id} blog={blog} />
            ))}
          </Section>
        ) : (
          <h2 className="text-2xl">No Blogs yet</h2>
        )}
      </Container>
    </>
  );
}
