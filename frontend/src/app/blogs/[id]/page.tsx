import Container from "@/components/Layout/Container";
import OptionsDropdown from "@/features/blogs/OptionsDropdown";
import api from "@/service/api";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaQuoteRight } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

type Props = { params: Promise<{ id: string }> };
export default async function BlogPage({ params }: Props) {
  const { id } = await params;
  const { data } = await api.blogs.get(+id);

  return (
    <>
      <Container
        as="main"
        className="py-10 mt-[40px] flex flex-start justify-start  gap-8"
      >
        <span>
          <FaQuoteRight className="text-gray-300" size={80} />
        </span>

        <section className="flex flex-col gap-4 flex-1 overflow-hidden">
          <h2 className="text-3xl font-bold capitalize">{data.title}</h2>

          <p className="truncate text-wrap whitespace-pre-wrap">
            {data.content}
          </p>

          <hr />
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center bg-gray-100 rounded-full aspect-square h-[70px] w-[70px]">
              <MdPerson size={60} className="text-gray-500" />
            </div>
            <strong className="capitalize">{data.user?.firstName}</strong>
          </div>
        </section>

        <OptionsDropdown
          blog={data}
          className="flex items-center gap-2 outline-1 rounded-full px-3 py-2 text-sm font-bold"
        >
          <BsThreeDotsVertical />
          <span>Options</span>
        </OptionsDropdown>
      </Container>
    </>
  );
}
