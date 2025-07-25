import deleteBlogAction from "@/app/actions/deleteBlogAction";
import Button from "@/components/Inputs/Button";
import InputField from "@/components/Inputs/InputField";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Blog } from "@/service/@apitypes/BlogType";
import { ToastStyles } from "@/utils/constants";
import { usePathname, useRouter } from "next/navigation";
import { HTMLAttributes, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function DeleteBlogButton({
  blog,
  children,
  ...props
}: {
  blog: Blog;
  children: React.ReactNode;
} & HTMLAttributes<HTMLButtonElement>) {
  const [state, formAction, pending] = useActionState(deleteBlogAction, null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (state?.status === true) {
      toast("Post deleted successfully", ToastStyles.success);
      setOpen(false);
      router.replace(pathname);
    }
  }, [state, router, pathname]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <button {...props}>{children}</button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden">
        <DialogHeader>
          <DialogTitle className="truncate max-w-[220px]">
            Delete Blog {blog.title}?
          </DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <InputField
            type="hidden"
            name="id"
            value={blog.id.toString()}
            label="ID"
            hidden
          />
          <DialogFooter>
            <Button variant="secondary" size="small" type="button">
              Cancel
            </Button>
            <Button
              loading={pending}
              type="submit"
              variant="error"
              size="small"
            >
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
