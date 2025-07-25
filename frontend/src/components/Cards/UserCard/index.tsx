import { User } from "@/service/@apitypes/UserType";
import Link, { LinkProps } from "next/link";

type Props = LinkProps & {
  user: User;
};
export default function UserCard({ user, ...props }: Props) {
  return (
    <Link {...props}>
      <h2>{user.firstName}</h2>
      <p>{user.email}</p>
    </Link>
  );
}
