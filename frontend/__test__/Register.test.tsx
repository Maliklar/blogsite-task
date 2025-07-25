import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterPage from "@/app/register/page";

global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

jest.mock("../src/lib/getUser", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(null),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("../src/app/actions/registerAction", () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve()),
}));

jest.mock("../src/components/Layout/Container", () => ({
  __esModule: true,
  default: ({ children }: any) => <main>{children}</main>,
}));

jest.mock("../src/components/Inputs/InputField", () => (props: any) => (
  <input {...props} placeholder={props.label} data-error={props.error || ""} />
));

jest.mock("../src/components/Inputs/PasswordInput", () => (props: any) => (
  <input
    type="password"
    {...props}
    placeholder={props.label}
    data-error={props.error || ""}
  />
));

jest.mock("../src/components/Inputs/Button", () => ({
  __esModule: true,
  default: (props: any) => <button {...props}>{props.children}</button>,
}));

describe("RegisterPage (Server Component)", () => {
  it("renders registration form with all fields", async () => {
    const ui = await RegisterPage({
      searchParams: Promise.resolve({}),
    });

    render(ui);

    expect(
      screen.getByRole("heading", { name: "Sign up" })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("displays error message if message param exists", async () => {
    const ui = await RegisterPage({
      searchParams: Promise.resolve({
        message: "Something went wrong",
      }),
    });

    render(ui);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
