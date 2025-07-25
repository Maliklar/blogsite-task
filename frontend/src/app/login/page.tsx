import Container from "@/components/Layout/Container";
import loginAction from "../actions/loginAction";
import InputField from "@/components/Inputs/InputField";
import Button from "@/components/Inputs/Button";
import getUser from "@/lib/getUser";
import { redirect } from "next/navigation";
import classNames from "classnames";
import Link from "next/link";
import PasswordInput from "@/components/Inputs/PasswordInput";
type SearchParams = {
  email?: string;
  password?: string;
  message?: string;
};
type Props = {
  searchParams: Promise<SearchParams>;
};
export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const emailError = params.email;
  const passwordError = params.password;
  const errorMessage = params.message;
  const user = await getUser();
  if (user) redirect("/");

  return (
    <Container
      as="main"
      className="flex-1 my-8 mt-[40px] flex justify-center items-center "
    >
      <form
        action={loginAction}
        className={classNames(
          "relative",
          "flex flex-col gap-8",
          "shadow-lg rounded-2xl",
          "border-1 border-solid border-[#e1e1e17c]",
          "p-8 mt-8 mx-auto",
          "w-full max-w-md"
        )}
      >
        <h1 className="text-2xl font-bold text-center capitalize my-5">
          Login
        </h1>
        <InputField
          type="email"
          name="email"
          label="Email"
          error={emailError}
          required
        />
        <PasswordInput
          name="password"
          label="Password"
          error={passwordError}
          required
        />

        {errorMessage ? (
          <small className="text-sm text-red-500">{errorMessage}</small>
        ) : null}

        <Link
          href="/register"
          className="text-center text-green-500 hover:underline"
        >
          Create New Account
        </Link>
        <Button type="submit" variant="primary">
          Login
        </Button>
      </form>
    </Container>
  );
}
