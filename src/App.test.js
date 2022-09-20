import { render, screen } from "@testing-library/react";

import App from "./App";

test("injected input has fs-exclud class", async () => {
  render(<App />);
  const input = await screen.findByTestId("input");
  expect(input).toHaveClass("fs-exclude");
});
