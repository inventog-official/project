"use client";

import { useEffect, useState } from "react";
import { useLeadsStore } from "@/lib/store/leads-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Pagination } from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

export default function LeadTabs() {
  const { toast } = useToast();
  const { leads, isLoading, error, fetchLeads, removeLead } = useLeadsStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        await removeLead(id);
        toast({
          title: "Lead deleted",
          description: "The lead has been successfully deleted.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete lead. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading leads...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading leads: {error}
      </div>
    );
  }

  const filterLeadsByType = (type: string) => {
    return leads.filter((lead) => 
      lead.type === type && 
      (searchTerm === "" || 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.whatsappNumber.includes(searchTerm) ||
        lead.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleExport = (type: string) => {
    const leadsToExport = filterLeadsByType(type);
    const csv = [
      ["Name", "WhatsApp Number", "Electricity Bill", "City", "Date"],
      ...leadsToExport.map((lead) => [
        lead.name,
        lead.whatsappNumber,
        lead.electricityBill.toString(),
        lead.city,
        new Date(lead.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-leads.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const LeadTable = ({ type }: { type: string }) => {
    const filteredLeads = filterLeadsByType(type);
    const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
    const paginatedLeads = filteredLeads.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => handleExport(type)}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead>Bill Amount</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.whatsappNumber}</TableCell>
                  <TableCell>₹{lead.electricityBill}</TableCell>
                  <TableCell>{lead.city}</TableCell>
                  <TableCell>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(lead.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <Tabs defaultValue="residential" className="space-y-4">
      <TabsList>
        <TabsTrigger value="residential">Residential</TabsTrigger>
        <TabsTrigger value="housing_society">Housing Society</TabsTrigger>
        <TabsTrigger value="commercial">Commercial</TabsTrigger>
      </TabsList>

      <TabsContent value="residential">
        <LeadTable type="residential" />
      </TabsContent>
      <TabsContent value="housing_society">
        <LeadTable type="housing_society" />
      </TabsContent>
      <TabsContent value="commercial">
        <LeadTable type="commercial" />
      </TabsContent>
    </Tabs>
  );
}