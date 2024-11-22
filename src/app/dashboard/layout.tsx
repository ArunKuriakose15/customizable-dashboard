import React from "react";
import { WidgetProvider } from "../contexts/WidgetContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WidgetProvider>{children}</WidgetProvider>;
}
