"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { LogOut, Router } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export function NavUser() {
  const { isMobile } = useSidebar()
  const [user, setUser] = useState({
    name: "",
    email: ""
  })

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id")
    const token= sessionStorage.getItem("token")
      axios
        .get(`http://localhost:8085/api/users/profile/${userId}`,{ headers: { token: token } } )
        .then((response) => {
          if (response.data.status === "success") {
            const userData = response.data.user[0]
            setUser({
              name: userData.name,
              email: userData.email
            })
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error)
        })
  }, [])
  const router = useRouter();
  const logOutAction = () => {
    sessionStorage.clear()
    router.push("/login")
}

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg" alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name
                    .split(" ")
                    .map((namePart) => namePart[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold" >{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg" alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name
                      .split(" ")
                      .map((namePart) => namePart[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button variant="ghost" onClick={ logOutAction}>
              <LogOut  />
              Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
