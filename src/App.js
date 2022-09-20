import * as React from "react";

import "./App.css";

const App = () => {
  const portalRef = React.useRef();
  useAppendStyleOnInsert(portalRef);

  return (
    <main>
      <h1>Hello CodeSandbox</h1>
      <div id="embedDiv" ref={portalRef} />
    </main>
  );
};

const useAppendStyleOnInsert = (ref) => {
  useMutationObserver(ref, addClass);
};

const useMutationObserver = (
  ref,
  callback,
  {
    takeRecordsBeforeDisconnect = true,
    observeOptions = {
      childList: true,
      subtree: true,
    },
  } = {
    takeRecordsBeforeDisconnect: true,
    observeOptions: {
      childList: true,
      subtree: true,
    },
  }
) =>
  React.useEffect(() => {
    const observer = new MutationObserver(callback);

    observer.observe(ref.current, observeOptions);

    return () => {
      if (takeRecordsBeforeDisconnect) {
        const mutations = observer.takeRecords();
        mutations.length > 0 && callback(mutations);
      }
      observer.disconnect();
    };
    // TODO: Wrap callback with useEvent once it's real
  }, [ref, callback, takeRecordsBeforeDisconnect, observeOptions]);

const addClass = (mutations) => {
  mutations.forEach((mutation) => {
    const telInput = mutation.target.querySelector("input[type=tel]");
    telInput && telInput.classList.add("fs-exclude");
  });
};

export default App;
