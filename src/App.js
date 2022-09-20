import * as React from "react";

const App = () => {
  useAppendStyleOnInsert();
  useInjectElement();

  return (
    <main>
      <h1>Hello CodeSandbox</h1>
      <div id="embedDiv" />
    </main>
  );
};

const useAppendStyleOnInsert = () =>
  React.useEffect(() => {
    const portal = document.getElementById("embedDiv");

    const observer = new MutationObserver(() => {
      const telInput = portal.querySelector("input[type=tel]");
      telInput && telInput.classList.add("fs-exclude");
    });

    observer.observe(portal, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

const useInjectElement = () =>
  React.useEffect(() => {
    const portal = document.getElementById("embedDiv");

    const telInput = document.createElement("input");
    telInput.type = "tel";
    telInput.setAttribute("data-testid", "input");

    !portal.querySelector("input[data-testid=input]") &&
      portal.append(telInput);
  }, []);

export default App;
