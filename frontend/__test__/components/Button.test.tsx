/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/Inputs/Button";
import "@testing-library/jest-dom";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click Me");
  });

  it("calls onClick", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("shows spinner when loading", () => {
    render(<Button loading>Load</Button>);
    expect(
      screen.getByRole("button").querySelector(".animate-spin")
    ).toBeInTheDocument();
  });

  it("disables button when loading", () => {
    render(<Button loading>Load</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

describe("Button.Link", () => {
  it("renders Link with text", () => {
    render(<Button.Link href="/test">Go</Button.Link>);
    expect(screen.getByRole("link")).toHaveTextContent("Go");
  });
});
