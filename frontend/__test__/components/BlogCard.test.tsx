/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/components/Cards/BlogCard";
import { Blog } from "@/service/@apitypes/BlogType";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

jest.mock("../../src/features/blogs/OptionsDropdown", () => ({
  __esModule: true,
  default: () => <div data-testid="edit-dropdown" />,
}));

jest.mock("../../src/components/Inputs/Button", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

const blog = {
  id: "1",
  title: "Test Blog Title",
  content: "Example text for and some text with text.",
  createdAt: "2024-06-01T00:00:00Z",
  user: {
    firstName: "John",
  },
} as Blog;

describe("BlogCard", () => {
  it("renders blog details", () => {
    render(<BlogCard blog={blog} href={`/blogs/${blog.id}`} />);
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Test Blog Title")).toBeInTheDocument();
    expect(
      screen.getByText("Example text for and some text with text.")
    ).toBeInTheDocument();

    expect(screen.getByTestId("edit-dropdown")).toBeInTheDocument();
    expect(screen.getByText("01, Jun 2024")).toBeInTheDocument();
  });
});
