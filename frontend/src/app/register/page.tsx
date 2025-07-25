import Container from "@/components/Layout/Container";
import registerAction from "../actions/registerAction";
import classNames from "classnames";
import InputField from "@/components/Inputs/InputField";
import Button from "@/components/Inputs/Button";
import getUser from "@/lib/getUser";
import { redirect } from "next/navigation";
import PasswordInput from "@/components/Inputs/PasswordInput";
import Link from "next/link";
type SearchParams = {
  email?: string;
  password?: string;
  firstName?: string;
  message?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function RegisterPage({ searchParams }: Props) {
  const params = await searchParams;
  const emailError = params.email;
  const passwordError = params.password;
  const firstNameError = params.firstName;
  const messageError = params?.message;

  const user = await getUser();
  if (user) redirect("/");
  return (
    <Container
      as="main"
      className="flex-1 flex items-center justify-center mt-[40px] py-8"
    >
      <form
        action={registerAction}
        className={classNames(
          "relative",
          "flex flex-col gap-5",
          "shadow-lg rounded-2xl",
          "border-1 border-solid border-[#e1e1e17c]",
          "p-8 mt-8 mx-auto",
          "w-full max-w-md"
        )}
      >
        <h2 className="text-2xl font-bold text-center capitalize my-8">
          Sign up
        </h2>
        <div className="flex gap-4">
          <InputField
            type="text"
            name="firstName"
            label="First Name"
            error={firstNameError}
          />
          <InputField type="text" name="lastName" label="Last Name" />
        </div>
        <InputField type="text" name="email" label="Email" error={emailError} />
        <PasswordInput name="password" label="Password" error={passwordError} />
        {messageError ? (
          <small className="text-red-500 text-sm">{messageError}</small>
        ) : null}
        <Link
          href="/login"
          className="text-center text-green-500 hover:underline"
        >
          Login
        </Link>{" "}
        <Button type="submit">Sign up</Button>
      </form>
    </Container>
  );
}
