import * as React from "react";

import "./App.css";

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

const useAppendStyleOnInsert = () => {
  const observer = useMutationObserver(addClass);

  React.useEffect(() => {
    const portal = document.querySelector("#embedDiv");
    observer.observe(portal, { childList: true, subtree: true });
  }, [observer]);
};

const useMutationObserver = (
  callback,
  { takeRecordsBeforeDisconnect = true } = {
    takeRecordsBeforeDisconnect: true,
  }
) => {
  const observer = React.useMemo(
    () => new MutationObserver(callback),
    [callback]
  );

  React.useEffect(() => {
    return () => {
      if (takeRecordsBeforeDisconnect) {
        const mutations = observer.takeRecords();
        mutations.length > 0 && callback(mutations);
      }
      observer.disconnect();
    };
    // TODO: Wrap callback with useEvent once it's real
  }, [observer, callback, takeRecordsBeforeDisconnect]);

  return observer;
};

const useInjectElement = () =>
  React.useEffect(() => {
    const portal = document.querySelector("#embedDiv");

    const telInput = document.createElement("input");
    telInput.type = "tel";
    telInput.setAttribute("data-testid", "input");

    portal.querySelector("input[data-testid=input]") ?? portal.append(telInput);
  }, []);

const addClass = (mutations) => {
  mutations.forEach((mutation) => {
    const telInput = mutation.target.querySelector("input[type=tel]");
    telInput && telInput.classList.add("fs-exclude");
  });
};

export default App;
