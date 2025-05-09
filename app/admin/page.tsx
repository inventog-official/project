import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminPage() {
  return (
    <div>
      <AdminHeader title="Welcome to Admin Panel" />
      <p className="text-muted-foreground">
        Select an option from the sidebar to manage your solar company's content.
      </p>
    </div>
  );
}