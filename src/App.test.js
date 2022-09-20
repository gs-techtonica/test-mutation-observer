import { render, screen } from "@testing-library/react";

import App from "./App";

test("injected input has fs-exclud class", async () => {
  render(<App />);

  // eslint-disable-next-line testing-library/no-node-access
  const portal = document.getElementById("embedDiv");
  const telInput = document.createElement("input");
  telInput.type = "tel";
  telInput.setAttribute("data-testid", "input");
  portal.append(telInput);

  await screen.findByTestId("input");
  expect(telInput).toHaveClass("fs-exclude");
});
