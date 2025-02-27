"use client";

import { useState } from "react";
import {
  BarChart3,
  Box,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductsTable } from "@/app/admin/_components/products-table";
import { OrdersTable } from "@/app/admin/_components/orders-table";
import { UsersTable } from "@/app/admin/_components/users-table";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <Sidebar>
          <SidebarHeader className="border-b border-border">
            <div className="flex h-14 items-center px-4">
              <div className="flex items-center gap-2 font-semibold">
                <Box className="h-6 w-6" />
                <span>Admin Panel</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={activeTab === "overview"}
                  onClick={() => setActiveTab("overview")}
                >
                  <button>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Overview</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={activeTab === "products"}
                  onClick={() => setActiveTab("products")}
                >
                  <button>
                    <Package className="h-4 w-4" />
                    <span>Products</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={activeTab === "orders"}
                  onClick={() => setActiveTab("orders")}
                >
                  <button>
                    <ShoppingCart className="h-4 w-4" />
                    <span>Orders</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={activeTab === "users"}
                  onClick={() => setActiveTab("users")}
                >
                  <button>
                    <Users className="h-4 w-4" />
                    <span>Users</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button>
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button>
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-border">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button>
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center justify-between">
              <h1
                className={cn("text-lg font-semibold", {
                  hidden: activeTab !== "overview",
                  block: activeTab === "overview",
                })}
              >
                Dashboard Overview
              </h1>
              <h1
                className={cn("text-lg font-semibold", {
                  hidden: activeTab !== "products",
                  block: activeTab === "products",
                })}
              >
                Products
              </h1>
              <h1
                className={cn("text-lg font-semibold", {
                  hidden: activeTab !== "orders",
                  block: activeTab === "orders",
                })}
              >
                Orders
              </h1>
              <h1
                className={cn("text-lg font-semibold", {
                  hidden: activeTab !== "users",
                  block: activeTab === "users",
                })}
              >
                Active Users
              </h1>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/")}
                >
                  <span className="sr-only sm:not-sr-only sm:ml-2">
                    View website
                  </span>
                </Button>
                <Button size="sm">
                  <span className="sr-only sm:not-sr-only sm:ml-2">
                    New item
                  </span>
                </Button>
              </div>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
            <div
              className={cn("", {
                hidden: activeTab !== "overview",
                block: activeTab === "overview",
              })}
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2,350</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Products
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Orders
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+1,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full bg-muted/50 rounded-md flex items-center justify-center">
                      Chart Placeholder
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      You have 12 pending orders.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            {i}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Order #{1000 + i}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {i === 1
                                ? "Just now"
                                : `${i} hour${i > 1 ? "s" : ""} ago`}
                            </p>
                          </div>
                          <div className="font-medium">
                            ${(Math.random() * 100).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div
              className={cn("", {
                hidden: activeTab !== "products",
                block: activeTab === "products",
              })}
            >
              <ProductsTable />
            </div>
            <div
              className={cn("", {
                hidden: activeTab !== "orders",
                block: activeTab === "orders",
              })}
            >
              <OrdersTable />
            </div>
            <div
              className={cn("", {
                hidden: activeTab !== "users",
                block: activeTab === "users",
              })}
            >
              <UsersTable />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
