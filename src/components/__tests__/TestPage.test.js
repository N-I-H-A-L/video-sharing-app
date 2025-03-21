import React from "react";
import { render, screen } from "@testing-library/react";
import TestPage from "../TestPage";

describe("TestPage", () => {
  it("renders the heading text", () => {
    render(<TestPage />);
    const headingElement = screen.getByText("Welcome to the Test Page");
    expect(headingElement).toBeInTheDocument();
  });

  it("renders the paragraph text", () => {
    render(<TestPage />);
    const paragraphElement = screen.getByText("This is a simple test component.");
    expect(paragraphElement).toBeInTheDocument();
  });
});