import { AppSidebar } from "@/components/app-sidebar"
import EarningCard from "@/components/EarningCard"
import { PointCard } from "@/components/PointCard"
import ProfitCard from "@/components/ProfitCard"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ViewChart } from "@/components/ViewChart"

export default function Page() {
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
                  <BreadcrumbLink href="#">
                    Customizable dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
 
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <EarningCard/>
          <ProfitCard/>
          <PointCard/>
            {/* <div className="aspect-video rounded-xl bg-muted/50" />
          
            <div className="aspect-video rounded-xl bg-muted/50" />
            
            <div className="aspect-video rounded-xl bg-muted/50" />
            
            <div className="aspect-video rounded-xl bg-muted/50" /> */}
           
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          <ViewChart/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
