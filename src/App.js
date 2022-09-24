import * as React from "react";

import "./App.css";

const App = () => {
  useAppendStyleOnInsert();

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

    const callback = () => {
      const telInput = portal.querySelector("input[type=tel]");
      telInput && telInput.classList.add("fs-exclude");
    };

    const observer = new MutationObserver(callback);

    observer.observe(portal, { childList: true, subtree: true });
    return () => {
      const mutations = observer.takeRecords();
      mutations.length > 0 && callback(mutations);
      observer.disconnect();
    };
  }, []);

export default App;
