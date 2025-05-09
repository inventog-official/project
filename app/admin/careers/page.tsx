"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminHeader from "@/components/admin/AdminHeader";
import CareerForm from "@/components/admin/CareerForm";
import CareerDialog from "@/components/admin/CareerDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Edit2, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

// Types
type Career = {
  id: string;
  title: string;
  type: "Full-Time" | "Part-Time" | "Internship";
  location: string;
  description: string;
  requirements: string;
  salary?: string;
  applyUrl?: string;
  createdAt: string;
};

type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  careerId: string;
  createdAt: string;
};

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: careersData = [],
    isLoading: careersLoading,
    error: careersError,
  } = useQuery<Career[]>({
    queryKey: ["careers"],
    queryFn: async () => {
      const res = await fetch("/api/careers");
      if (!res.ok) throw new Error("Failed to fetch careers");
      return res.json();
    },
  });

  const {
    data: applicationsData = [],
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useQuery<Application[]>({
    queryKey: ["jobApplications"],
    queryFn: async () => {
      const res = await fetch("/api/job-applications");
      if (!res.ok) throw new Error("Failed to fetch applications");
      return res.json();
    },
  });

  const deleteCareer = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/careers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete career");
    },
    onSuccess: () => {
      toast.success("Career deleted");
      queryClient.invalidateQueries({ queryKey: ["careers"] });
    },
    onError: () => {
      toast.error("Delete failed");
    },
  });

  const selectedCareerData = useMemo(
    () => careersData.find((c) => c.id === selectedCareer) || null,
    [selectedCareer, careersData]
  );

  const filteredCareers = careersData.filter((career) =>
    [career.title, career.location, career.type]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applicationsData.filter((application) =>
    [application.name, application.email]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleExport = (type: "careers" | "applications") => {
    const data = type === "careers" ? filteredCareers : filteredApplications;
    const headers =
      type === "careers"
        ? ["Title", "Type", "Location", "Created At"]
        : ["Name", "Email", "Phone", "Job Title", "Created At"];

    const csv = [
      headers,
      ...data.map((item) => {
        if (type === "careers") {
          const career = item as Career;
          return [
            career.title,
            career.type,
            career.location,
            new Date(career.createdAt).toLocaleDateString(),
          ];
        } else {
          const application = item as Application;
          const career = careersData.find((c) => c.id === application.careerId);
          return [
            application.name,
            application.email,
            application.phone,
            career?.title || "Unknown Position",
            new Date(application.createdAt).toLocaleDateString(),
          ];
        }
      }),
    ]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    try {
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success(
        `${
          type === "careers" ? "Career Listings" : "Applications"
        } exported successfully!`
      );
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Export failed. Please try again.");
    }
  };

  if (careersLoading || applicationsLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div>
      <AdminHeader title="Careers Management" />

      {selectedCareer ? (
        <CareerForm
          initialData={selectedCareerData!}
          onClose={() => setSelectedCareer(null)}
        />
      ) : (
        <Tabs defaultValue="listings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="listings">Job Listings</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search listings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => handleExport("careers")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  <CareerDialog />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Posted Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCareers.map((career) => (
                      <TableRow key={career.id}>
                        <TableCell className="font-medium">
                          {career.title}
                        </TableCell>
                        <TableCell>{career.type}</TableCell>
                        <TableCell>{career.location}</TableCell>
                        <TableCell>
                          {
                            applicationsData.filter(
                              (a) => a.careerId === career.id
                            ).length
                          }
                        </TableCell>
                        <TableCell>
                          {new Date(career.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedCareer(career.id)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete the job posting.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteCareer.mutate(career.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleExport("applications")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead className="text-right">Resume</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((application) => {
                      const career = careersData.find(
                        (c) => c.id === application.careerId
                      );
                      return (
                        <TableRow key={application.id}>
                          <TableCell className="font-medium">
                            {application.name}
                          </TableCell>
                          <TableCell>{application.email}</TableCell>
                          <TableCell>
                            {career?.title || "Unknown Position"}
                          </TableCell>
                          <TableCell>
                            {new Date(
                              application.createdAt
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                window.open(application.resumeUrl, "_blank")
                              }
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
