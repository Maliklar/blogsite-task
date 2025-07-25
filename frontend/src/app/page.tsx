import BlogCard from "@/components/Cards/BlogCard";
import UserCard from "@/components/Cards/UserCard";
import Container from "@/components/Layout/Container";
import Section from "@/components/Layout/Section";
import api from "@/service/api";
import Link from "next/link";

export default async function Home() {
  const { data: blogData } = await api.blogs.getAll({ page: 1, pageSize: 6 });
  const blogs = blogData?.data;

  const { data: userData } = await api.users.getAll({ page: 1, pageSize: 6 });
  const users = userData?.data;
  return (
    <>
      <Container as="main" className="py-10 flex flex-col mt-[40px] gap-10">
        <h1 className="text-2xl font-bold">Blog Site</h1>
        {blogs && blogs.length ? (
          <Section
            title="Latest Blogs"
            subTitle="The latest blogs in our community"
            link="/blogs"
          >
            {blogs.map((blog) => (
              <BlogCard href={`/blogs/${blog.id}`} key={blog.id} blog={blog} />
            ))}
          </Section>
        ) : null}

        {users && users.length ? (
          <Section
            title="Most active members"
            subTitle="The most active members on the platform"
            link="/users"
          >
            {users.map((user) => (
              <UserCard href={`/users/${user.id}`} key={user.id} user={user} />
            ))}
          </Section>
        ) : null}

        {blogs && blogs.length ? (
          <Section
            title="More blogs"
            subTitle="Blogs you might like"
            link="/blogs"
          >
            {blogs.map((blog) => (
              <BlogCard href={`/blogs/${blog.id}`} key={blog.id} blog={blog} />
            ))}
          </Section>
        ) : null}
      </Container>
    </>
  );
}
