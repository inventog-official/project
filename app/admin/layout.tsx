"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from "@/components/admin/Sidebar";
import { useAdminStore } from '@/lib/store';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoginPage, router]);

  return (
    <div className="min-h-screen bg-background">
      <style jsx global>{`
        header, footer {
          display: none !important;
        }
      `}</style>
      {!isLoginPage && isAuthenticated && <Sidebar />}
      <main className={!isLoginPage && isAuthenticated ? "ml-0 lg:ml-64 p-8" : ""}>
        {children}
      </main>
    </div>
  );
}