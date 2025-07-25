/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import BlogsPage from "@/app/blogs/page";
import "@testing-library/jest-dom";

jest.mock("../src/service/api", () => ({
  __esModule: true,
  default: {
    blogs: {
      getAll: jest.fn().mockResolvedValue({
        data: {
          data: [
            {
              id: "1",
              title: "Blog 1",
              content: "Test 1",
              createdAt: "2024-01-01",
              user: { firstName: "User" },
            },
          ],
          totalPages: 1,
        },
      }),
    },
  },
}));

jest.mock("../src/components/Cards/BlogCard", () => ({
  __esModule: true,
  default: ({ blog }: any) => <div>{blog.title}</div>,
}));

jest.mock("../src/components/Layout/Pagination", () => ({
  __esModule: true,
  default: () => <div>Pagination</div>,
}));

jest.mock("../src/components/Layout/Container", () => ({
  __esModule: true,
  default: ({ children }: any) => <main>{children}</main>,
}));

describe("BlogsPage", () => {
  it("renders blogs and pagination", async () => {
    const props = {
      searchParams: Promise.resolve({ page: "1", pageSize: "10" }),
    };
    render(await BlogsPage(props));
    expect(await screen.findByText("Blog 1")).toBeInTheDocument();
    expect(screen.getByText("Pagination")).toBeInTheDocument();
  });
});
