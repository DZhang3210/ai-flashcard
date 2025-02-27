"use client";
import React from "react";

import { AdminDashboard } from "./_components/admin-dashboard";

const AdminPage = () => {
  // const { data: isAdmin, isLoading } = useIsAdmin();
  // const router = useRouter();
  // useEffect(() => {
  //   if (!isAdmin && !isLoading) {
  //     router.push("/");
  //   }
  // }, [isAdmin, isLoading, router]);
  return (
    <div>
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
