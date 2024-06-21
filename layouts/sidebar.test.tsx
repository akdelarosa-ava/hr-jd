import { render, fireEvent, screen } from "@testing-library/react";
import Sidebar from "@/components/layouts/sidebar";

describe("Sidebar", () => {
  test("renders without errors", () => {
    render(<Sidebar expand={false} setExpand={() => {}} />);
  });

  test("displays a word Recent", () => {
    render(<Sidebar expand={true} setExpand={() => {}} />);
    const recent = screen.getByText(/recent/i);

    expect(recent).toBeInTheDocument();
  });
});