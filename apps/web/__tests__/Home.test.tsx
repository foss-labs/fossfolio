import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "@app/pages/index";

describe("Home page", () => {
  it("Join Button is visible", () => {
    render(<Page />);

    const loginSpan = screen
      .getByRole("button", { name: /join Event/i })
      .querySelector("span");
    expect(loginSpan).toBeTruthy();
  });
});
