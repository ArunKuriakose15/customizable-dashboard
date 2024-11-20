"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import EarningCard from "@/components/EarningCard";
import { PointCard } from "@/components/PointCard";
import ProfitCard from "@/components/ProfitCard";
import { ViewChart } from "@/components/ViewChart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import axios from "axios";

export default function Page() {
  const [visibleWidgets, setVisibleWidgets] = useState({
    EarningCard: false,
    ProfitCard: false,
    PointCard: false,
    ViewChart: false,
  });

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const userId = sessionStorage.getItem("user_id")
      const token= sessionStorage.getItem("token")
        const response = await axios.get(`http://localhost:8085/api/widget/widget-preferences/${userId}`,{ headers: { token: token } });
        if (response.data.status === "success") {
          const widgets = response.data.data.reduce((acc, widget) => {
            acc[widget.widgetName] = widget.is_visible;
            return acc;
          }, {});
          setVisibleWidgets(widgets);
        }
      } catch (error) {
        console.error("Error fetching widget visibility:", error);
      }
    };

    fetchWidgets();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Customizable dashboard</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {visibleWidgets.EarningCard && <EarningCard />}
            {visibleWidgets.ProfitCard && <ProfitCard />}
            {visibleWidgets.PointCard && <PointCard />}
          </div>
          {visibleWidgets.ViewChart && (
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              <ViewChart />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
