"use client";

import EditBlogDropdown from "@/features/blogs/OptionsDropdown";
import { Blog } from "@/service/@apitypes/BlogType";
import classNames from "classnames";
import dayjs from "dayjs";
import Link, { LinkProps } from "next/link";
import { FaClock } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

type Props = LinkProps & { blog: Blog };

export default function BlogCard({ blog, ...props }: Props) {
  return (
    <div
      className={classNames(
        "flex flex-col",
        "rounded-2xl border-1 border-solid border-gray-100",
        "p-3",
        "max-h-[220px] min-h-[220px] h-[220px]",
        "shadow-sm cursor-pointer"
      )}
    >
      <Link className={classNames("flex gap-3 h-full")} {...props}>
        <div className="flex items-center gap-2 flex-col justify-between">
          <div className="flex items-center justify-center bg-gray-100 rounded-full w-10 h-10">
            <MdPerson size={60} className="text-gray-500" />
          </div>
        </div>
        <div className="relative flex flex-col  flex-1 overflow-hidden ">
          <h3 className="text-sm capitalize text-gray-600 font-bold truncate">
            {blog.user?.firstName}
          </h3>
          <hr className="my-2" />

          <h2 className="text-xl font-[500]  capitalize truncate">
            {blog.title}
          </h2>
          <p className="text-gray-500 text-sm text-wrap overflow-hidden line-clamp-4 truncate">
            {blog.content}
          </p>
        </div>
      </Link>
      <div className="flex items-center gap-3 mt-auto justify-between">
        <span className="flex items-center gap-3">
          <EditBlogDropdown
            blog={blog}
            className="bg-gray-100 p-1.5 rounded-full"
          />
          <small className="flex items-center justify-end gap-1 text-gray-500 ">
            <FaClock /> {dayjs(blog.createdAt).format("DD, MMM YYYY")}
          </small>
        </span>
      </div>
    </div>
  );
}
