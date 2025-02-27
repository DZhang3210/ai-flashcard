"use client";
import React, { useEffect } from "react";
import { useIsAdmin } from "@/features/auth/api/use-is-admin";
import { useRouter } from "next/navigation";
import { AdminDashboard } from "./_components/admin-dashboard";

const AdminPage = () => {
  const { data: isAdmin, isLoading } = useIsAdmin();
  const router = useRouter();
  useEffect(() => {
    if (!isAdmin && !isLoading) {
      router.push("/");
    }
  }, [isAdmin, isLoading, router]);
  return (
    <div>
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
