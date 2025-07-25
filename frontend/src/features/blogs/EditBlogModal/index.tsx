"use client";
import editBlogAction from "@/app/actions/editBlogAction";
import Button from "@/components/Inputs/Button";
import InputField from "@/components/Inputs/InputField";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Blog } from "@/service/@apitypes/BlogType";
import { ToastStyles } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditBlogModal({
  blog,
  open,
  setOpen,
}: {
  blog: Blog;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [state, formAction, pending] = useActionState(editBlogAction, null);
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const router = useRouter();

  useEffect(() => {
    setTitle(blog.title);
    setContent(blog.content);
  }, [blog]);

  useEffect(() => {
    if (state?.status === true) {
      setTitle("");
      setContent("");
      toast("Blog Updated successfully", ToastStyles.success);
      setOpen(false);
    }
  }, [router, state, setOpen]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 mt-4" action={formAction}>
          <InputField
            type="hidden"
            name="id"
            defaultValue={blog.id.toString()}
            value={blog.id.toString()}
            label="ID"
            hidden
          />
          <InputField
            type="text"
            name="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter your blog title"
            error={state?.errors?.title}
          />
          <InputField
            textArea
            type="text"
            name="content"
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            error={state?.errors?.content}
            placeholder="Something, something, and something else..."
            required
          />

          {state?.status === false && (
            <small className="text-red-500">{state.message}</small>
          )}
          <DialogFooter>
            <Button
              className="mt-4"
              type="submit"
              size="small"
              loading={pending}
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
