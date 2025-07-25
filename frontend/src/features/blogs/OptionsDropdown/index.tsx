"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Blog } from "@/service/@apitypes/BlogType";

import { useAuth } from "@/store/AuthStoreProvider";
import classNames from "classnames";
import { HTMLAttributes, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdModeEdit } from "react-icons/md";
import DeleteBlogButton from "../DeleteBlogButton";
import EditBlogModal from "../EditBlogModal";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

type Props = {
  blog: Blog;
} & HTMLAttributes<HTMLButtonElement>;
export default function OptionsDropdown({ blog, className, ...props }: Props) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (!user) return null;
  if (user.id !== blog.userId) return null;
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            className={classNames("cursor-pointer h-min", className)}
            {...props}
          >
            {props.children ? props.children : <BsThreeDotsVertical />}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer  text-sm text-gray-800 flex items-center gap-2 w-full px-2"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <MdModeEdit /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DeleteBlogButton
            blog={blog}
            className="cursor-pointer  text-sm text-red-500 flex items-center gap-2 w-full p-2"
          >
            <MdDelete /> Delete
          </DeleteBlogButton>
        </DropdownMenuContent>
        <DropdownMenuSeparator />
      </DropdownMenu>
      <EditBlogModal blog={blog} open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
