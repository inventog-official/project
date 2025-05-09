"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import LeadTabs from "@/components/admin/LeadTabs";

export default function LeadsPage() {
  return (
    <div>
      <AdminHeader title="Leads Management" />
      <LeadTabs />
    </div>
  );
}