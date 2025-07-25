"use client";
import createBlogAction from "@/app/actions/createBlogAction";
import Button, { CustomButtonProps } from "@/components/Inputs/Button";
import InputField from "@/components/Inputs/InputField";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToastStyles } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateBlogFAB(props: CustomButtonProps) {
  const [state, formAction, pending] = useActionState(createBlogAction, null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (state?.status === true) {
      setTitle("");
      setContent("");
      toast("Blog created successfully", ToastStyles.success);
      setOpen(false);
      router.push("/blogs");
    }
  }, [router, state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="!fixed bottom-0 end-0 m-10 shadow-3xl w-min"
          {...props}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Blog</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 mt-4" action={formAction}>
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
