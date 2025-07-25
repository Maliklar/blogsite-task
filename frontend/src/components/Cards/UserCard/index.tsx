import { User } from "@/service/@apitypes/UserType";
import classNames from "classnames";
import dayjs from "dayjs";
import Link, { LinkProps } from "next/link";
import { MdPerson } from "react-icons/md";

type Props = LinkProps & {
  user: User;
};
export default function UserCard({ user, ...props }: Props) {
  return (
    <Link
      className={classNames(
        "flex  items-center gap-4",
        "rounded-2xl border-1 border-solid border-gray-100",
        "p-3",
        "max-h-[120px] min-h-[120px] h-[120px]",
        "shadow-sm cursor-pointer"
      )}
      {...props}
    >
      <div className="flex items-center justify-center bg-gray-100 rounded-full h-[60px] w-[60px]">
        <MdPerson size={60} className="text-gray-500" />
      </div>
      <div>
        <h2 className="font-bold capitalize">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-700 text-sm font-bold">{user.email}</p>
        <p className="text-gray-600 text-xs font-bold">
          Member Since {dayjs(user.createdAt).format("DD, MMM YYYY")}
        </p>
      </div>
    </Link>
  );
}
