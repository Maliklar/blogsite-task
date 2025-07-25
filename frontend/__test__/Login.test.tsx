/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "@/app/login/page";

jest.mock("../src/lib/getUser", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(null),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("../src/components/Layout/Container", () => ({
  __esModule: true,
  default: ({ children }: any) => <main>{children}</main>,
}));

jest.mock("../src/components/Inputs/InputField", () => (props: any) => (
  <input {...props} placeholder={props.label} />
));

jest.mock("../src/components/Inputs/Button", () => ({
  __esModule: true,
  default: (props: any) => <button {...props}>{props.children}</button>,
}));

describe("LoginPage", () => {
  it("renders form with inputs and login button", async () => {
    const ui = await LoginPage();

    render(ui);
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Create New Account")).toBeInTheDocument();
  });
});
