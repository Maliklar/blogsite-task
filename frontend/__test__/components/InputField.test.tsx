import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "@/components/Inputs/InputField";
import "@testing-library/jest-dom";

describe("InputField", () => {
  it("renders input with label", () => {
    render(<InputField id="name" label="Name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("renders textarea when textArea is true", () => {
    render(<InputField id="desc" label="Desc" textArea />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<InputField id="email" label="Email" error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("updates value on change", () => {
    render(<InputField id="input" label="Input" />);
    const input = screen.getByLabelText("Input");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");
  });
});
