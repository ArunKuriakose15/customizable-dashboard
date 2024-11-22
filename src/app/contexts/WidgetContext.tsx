"use client";

import React, { createContext, useContext, useState } from "react";

type WidgetContextType = {
  refreshWidgets: () => void;
};

const WidgetContext = createContext<WidgetContextType>({
  refreshWidgets: () => {},
});

export const WidgetProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshWidgets = () => setRefreshFlag((prev) => !prev);

  return (
    <WidgetContext.Provider value={{ refreshWidgets }}>
      {children}
    </WidgetContext.Provider>
  );
};

export const useWidgetContext = () => useContext(WidgetContext);
