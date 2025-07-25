import { render, screen } from "@testing-library/react";
import Container from "@/components/Layout/Container";
import "@testing-library/jest-dom";

describe("Container", () => {
  it("renders default div", () => {
    render(<Container>Content</Container>);
    expect(screen.getByText("Content").tagName).toBe("DIV");
  });

  it("renders with custom element", () => {
    render(<Container as="section">Section</Container>);
    expect(screen.getByText("Section").tagName).toBe("SECTION");
  });

  it("applies noPadding", () => {
    render(<Container noPadding>Text</Container>);
    expect(screen.getByText("Text")).toHaveClass("px-0");
  });

  it("merges custom className", () => {
    render(<Container className="bg-red-500">Box</Container>);
    expect(screen.getByText("Box")).toHaveClass("bg-red-500");
  });
});
