"use client";

import { Provider } from "react-redux";
import { store } from "./../stores/store";
import { PersistGate } from "redux-persist/integration/react";
import { PersistorOptions, persistStore } from "redux-persist";
import { useEffect } from "react";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  // manual persist for faster load
  const persistor = persistStore(store, {
    manualPersist: true,
  } as PersistorOptions);

  // trigger manual persist
  useEffect(() => {
    persistor.persist();
  }, [persistor]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
